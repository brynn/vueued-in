<template>
  <div>
    <md-button type="button" @click="formName='login'">Log In</md-button>
    <md-button type="button" @click="formName='signup'">Sign Up</md-button>
    <form novalidate @submit.prevent="validateUser">
      <md-card>
        <md-card-header>
          <div class="md-title" v-bind:style="{'color':'#fff'}">
            <span v-if="formName==='login'">Log In to</span>
            <span v-else>Sign Up For</span> ✓ueued In
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <!-- name field (signup only) -->
              <md-field :class="getValidationClass('name')" v-show="formName==='signup'">
                <label for="name">Your name</label>

                <md-input
                  type="name"
                  name="name"
                  id="name"
                  autocomplete="name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <md-icon>person</md-icon>
                <span class="md-error" v-if="!$v.form.name.required">Name is required</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <!-- email field -->
              <md-field :class="getValidationClass('email')">
                <label for="email">Your email</label>
                <md-input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  v-model="form.email"
                  :disabled="sending"
                />
                <md-icon>email</md-icon>
                <span class="md-error" v-if="!$v.form.email.required">Email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>
            </div>
            <div class="md-layout-item">
              <!-- password field -->
              <md-field :class="getValidationClass('password')">
                <label for="password">Your password</label>
                <md-input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="password"
                  v-model="form.password"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">
            <span v-if="formName==='login'">Log In</span>
            <span v-else>Sign Up</span>
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';
import { auth } from '../store';

export default {
  name: 'AuthForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      email: null,
    },
    sending: false,
    lastUser: null,
    userSaved: false,
    formName: 'login',
  }),
  validations: {
    form: {
      name: {},
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  created() {
    this.$store.dispatch('users/removeLoggedInUser');
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.email = null;
    },
    // TODO: refactor sign up and log in methods into one
    signUpUser(userObject) {
      this.sending = true;
      try {
        this.$store.dispatch('users/signup', userObject);
        this.userSaved = true;
        this.$router.push('/home');
      } catch (err) {
        // TODO: fix error handling
        console.log('signup error: ', err);
        this.clearForm();
      }
      this.sending = false;
    },
    logInUser(credentials) {
      this.sending = true;
      try {
        this.$store.dispatch('users/login', credentials);
        this.userSaved = true;
        this.$router.push('/home');
      } catch (err) {
        // TODO: fix error handling
        console.log('login error: ', err);
        this.clearForm();
      }
      this.sending = false;
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = this.form.email;
        const password = this.form.password;
        const credentials = {
          email,
          password,
        };
        if (this.formName === 'signup') {
          const fullName = this.form.name.split(' ');
          const firstName = fullName[0];
          let lastName;
          // last name is not required
          if (fullName.length > 1) {
            lastName = fullName[1];
          }
          const userObject = { firstName, lastName, ...credentials };
          this.signUpUser(userObject);
        } else {
          this.logInUser(credentials);
        }
      }
    },
  },
};
</script>
