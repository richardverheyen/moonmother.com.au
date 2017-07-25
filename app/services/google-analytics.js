import Ember from 'ember';
import config from '../config/environment';

const enabled = config.googleAnalytics && config.googleAnalytics.trackingId && ga ? true : false;

export default Ember.Service.extend({

  startTracking() {
    if (enabled) { return; }
    ga('create', {
      trackingId: config.googleAnalytics.trackingId
    });
    ga('set', {
      dimension1: config.modulePrefix,
      dimension2: config.environment
    });
  },

  sendPageView(currentRoute) {
    if (enabled) { return; }
    ga('set', {
      page: window.location.pathname,
      hostname: window.location.host,
      title: document.title,
      dimension2: currentRoute.routeName.replace(/\./g, '/'),
    });
    ga('send', 'pageview');
  }

});
