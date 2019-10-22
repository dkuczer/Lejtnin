({
    init: function (component){
      var starClasses = [];
      for(var i = 0; i < 5; i++){
          starClasses.push('ratingStar starGray');
      }
      console.log(starClasses);
      component.set('v.starsClasses', starClasses);
    },
    setRating: function (component, event) {
    },
    starsHover: function (component, event) {
        var score = event.target.id;
        var starClasses = component.get('v.starsClasses');
        for(var i = 0; i <= score; i++){
            starClasses[i] = starClasses[0].substring(0, 10);
        }
        // console.log(starClasses);
        console.log(score);

        component.set('v.starsClasses', starClasses);
    },
    starsEndHover: function (component, event) {
        var score = event.target.id;
        var starClasses = component.get('v.starsClasses');
        for(var i = 0; i <= score; i++){
            starClasses[i] = (starClasses[i] + ' starGray');
        }
        console.log(starClasses);
        console.log(score);
        component.set('v.starsClasses', starClasses);
    }
})