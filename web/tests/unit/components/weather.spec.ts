/* eslint-disable @typescript-eslint/camelcase */
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@/components/Weather.vue';

describe('Weather.vue', () => {
  let wrapper: any;

  before(() => {
    wrapper = shallowMount(Home, {
      propsData: {
        weather: {
          city: 'TestCity',
          current: {
            temp: 9.5,
            desc_short: 'Rain',
            desc_long: 'Always rain',
            owm_icon: 'http://openweathermap.org/img/wn/10n@2x.png',
          },
        },
      },
    });
  });

  it('shows city name', () => {
    expect(wrapper.find('h2.city-name').text()).to.include('TestCity');
  });

  it('shows weather unsplash image', () => {
    expect(wrapper.find('img.city').attributes('src')).to.include('Rain');
  });

  it('shows temperature', () => {
    expect(wrapper.find('.temp').text()).to.include('9.5');
  });

  it('shows icon if exists', () => {
    expect(wrapper.find('img.icon').attributes('src')).to.include('openweathermap.org');
  });

  it('shows descriptions', () => {
    expect(wrapper.find('.desc').text()).to.include('Rain');
    expect(wrapper.find('.desc').text()).to.include('Always rain');
  });
});
