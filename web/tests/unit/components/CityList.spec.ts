/* eslint-disable @typescript-eslint/camelcase, no-unused-expressions */
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import CityList from '@/components/CityList.vue';

describe('CityList.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(CityList, {
      propsData: {
        cities: [
          { _id: '1', name: 'Test1' },
          { _id: '2', name: 'Test2' },
          { _id: '3', name: 'Test3' },
        ],
      },
    });
  });

  it('shows city names', () => {
    expect(wrapper.text()).to.include('Test1');
    expect(wrapper.text()).to.include('Test2');
    expect(wrapper.text()).to.include('Test3');
  });

  it('emits on click', () => {
    const link = wrapper.find('a');
    expect(link).not.to.be.null;
    expect(wrapper.emitted('changeCity')).to.be.undefined;
    link.trigger('click');
    expect(wrapper.emitted('changeCity')).to.be.ok;
  });

  it('emits on search', () => {
    const input = wrapper.find('input');
    expect(input).not.to.be.null;
    expect(wrapper.emitted('changeCity')).to.be.undefined;
    input.setValue('London');
    input.trigger('submit');
    expect(wrapper.emitted('changeCity')[0][0]).to.equal('London');
  });
});
