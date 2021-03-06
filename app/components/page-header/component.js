import Ember from 'ember';
import $ from "jquery";

const { computed, inject } = Ember;

let positions = [-90, 0, 90];
let degrees = [-90, 0, 90];
const baseDuration = 2600;
const easing = 'easeInOutCubic';

export default Ember.Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['currentRoute', 'collapsed:collapsed'],
  router: inject.service('-routing'),
  currentRoute: computed.alias('router.currentRouteName'),
  collapsed: false,

  rotateCelestialsTo(id, instant) {
    const collapsed = this.get('collapsed');

    // TODO: Find better way to do this
    if (collapsed) {
      if (id === 'about') {
        positions = [-60, 0, 60];
      } else if (id === 'services') {
        positions = [60, -60, 0];
      } else {
        positions = [0, 60, -60];
      }
    } else {
      if (id === 'about') {
        positions = [-90, 0, 90];
      } else if (id === 'services') {
        positions = [90, -90, 0];
      } else {
        positions = [0, 90, -90];
      }
    }

    const duration = instant ? 0 : baseDuration;
    $(`.planet`).each(function(i) {
      if ($(this).hasClass('velocity-animating')) { return; }
      const currentPos = degrees[i];
      let targetPos = positions[i];
      let newPos = targetPos <= currentPos ? targetPos + 360 : targetPos;
      $(this).velocity('stop').delay(i * 100).velocity({
        rotateZ: `${newPos}deg`
      }, {
        duration,
        easing,
        complete: function() {
          $(this).velocity({ rotateZ: `${targetPos}deg` }, 0);
          degrees[i] = targetPos;
        }
      })
    });
  },

  scrollToTop() {
    const duration = baseDuration;
    $('header').velocity('scroll', {
      duration,
      easing,
      begin() {
        $('body').addClass('prevent-scroll');
      },
      complete() {
        $('body').removeClass('prevent-scroll');
      }
    });
  },

  didInsertElement() {
    this.rotateCelestialsTo(this.get('currentRoute'), true);
  },

  actions: {
    collapseGalaxy(event) {
      const id = event.currentTarget.id;
      if (id === this.get('currentRoute')) { return; }
      this.set('collapsed', true);
      this.rotateCelestialsTo(id);
      this.scrollToTop();
    },
    expandGalaxy() {
      this.set('collapsed', false);
      this.rotateCelestialsTo('index');
    }
  }
});
