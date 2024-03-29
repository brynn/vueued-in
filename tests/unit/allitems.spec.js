import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AllItems from '@/components/AllItems.vue';

describe('AllItems.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(AllItems, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
