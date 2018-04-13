/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [
        {
          name: "Bob",
          bio: "is an architect",
          bioVisible: true
        },
        {
          name: "George",
          bio: "is a carpenter",
          bioVisible: true
        },
        {
          name: "Fred",
          bio: "is a fish",
          bioVisible: true
        }
      ],
      newPerson: {name: "", bio: "", bioVisible: ""}
    };
  },
  created: function() {},
  methods: {
    addPerson: function() {
      console.log("adding a person");
      this.people.push(this.newPerson);
    },
    countPeople: function() {
      console.log("counting people");
      var counter = document.querySelectorAll("#counter");
      counter.innerText = this.people.length;
    },
    deletePerson: function(thePerson) {
      console.log("deleting person");
      var index = this.people.indexOf(thePerson);
      this.people.splice(index, 1);
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
