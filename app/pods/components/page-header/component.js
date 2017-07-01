import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['currentRoute', 'moonGlow:moon:owl'],
  router: inject.service('-routing'),
  currentRoute: computed.alias('router.currentRouteName'),
  moonGlow: false,

  actions: {
    moonGlow(boolean) {
      this.set('moonGlow', boolean);
      Ember.$('body').toggleClass('moon', boolean);

      // const $pageHeader = this.$();
      // const $constelation = this.$('#constelation');
      //
      // const moon = this.get('moonGlow');
      // const pageHeaderHeight = moon ? '29vh' : '100vh';
      // const constelationHeight = moon ? '38vh' : '100'
      //
      //
      // $pageHeader.velocity('stop').velocity({
      //   height: pageHeaderHeight
      // }, 4000, 'easeOutExpo');
      //
      // $constelation.velocity('stop').velocity({
      //   height: 38vh;
      //   width: 38vh;
      //   transform: translate(-19vh, -19vh);
      // });
    }
  }
});
