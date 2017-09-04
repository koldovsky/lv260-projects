var app = angular.module('GroupApp', ['ngMaterial']);

// https://stackoverflow.com/a/16349631
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'studentService', function ($scope, $mdSidenav, studentService) {
    var allStudents = [];


    $scope.subgroups = [1, 2];
    $scope.selectedsubgroups = [1, 2];
    $scope.isChosenOnly = false;
    //$scope.toggle = function (item, list) {
    //  var idx = list.indexOf(item);
    //  if (idx >-1) {
    //    list.splice(idx, 1);
    //  } else {
    //    list.push(item);
    //  }
    //};
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.toggleChosen = function (item) {
        $scope.isChosenOnly = !$scope.isChosenOnly;
    };
    //$scope.filterBySubgroup = function (student) {
    //  return $scope.exists(student.subgroup, $scope.selectedsubgroups);
    //};

    $scope.filterByChosen = function (student) {
        if ($scope.isChosenOnly) {
            if (student.isChosenProject) {
                console.log(student);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    $scope.filterByData = function (student) {
        if (!student.websiteUrl || !student.codeSourceUrl) {
            return false;
        }
        return true;
    }

    $scope.selected = null;
    $scope.students = allStudents;
    $scope.selectStudent = selectStudent;
    $scope.toggleSidenav = toggleSidenav;

    loadStudents();

    function loadStudents() {
        studentService.loadAll()
            .then(function (students) {
                allStudents = students;
                $scope.students = [].concat(students);
                $scope.selected = $scope.students[0];
            })
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectStudent(student) {
        $scope.selected = angular.isNumber(student) ? $scope.students[student] : student;
        $scope.toggleSidenav('left');
    }

}]);

app.service('studentService', ['$q', function ($q) {

    //! http://www.convertcsv.com/csv-to-json.htm
    // http://www.csvjson.com/csv2json
    var students = [
        {
          "name": "Andrii Hischyns'kyi",
          "websiteUrl": "https://andriyhishchynskyy.github.io/star/",
          "codeSourceUrl": "https://github.com/AndriyHishchynskyy/star",
          "cvUrl": "",
          "photo": "images/students/hischinsky.jpg"
        },
        {
          "name": "Vasyl' Khamuliak",
          "websiteUrl": "https://vasilhamulyak.github.io/my-website/",
          "codeSourceUrl": "https://github.com/VasilHamulyak/my-website",
          "cvUrl": "https://www.linkedin.com/in/vasil-khamuliak-8138a714a/",
          "photo": "images/students/khamuliak.jpg"
        },
        {
          "name": "Volodymyr Boichuk",
          "websiteUrl": "https://rilhad1.github.io/my-resume/",
          "codeSourceUrl": "https://github.com/rilhad1/my-resume",
          "cvUrl": "https://www.linkedin.com/in/volodimir-boychuk-5434a1115/",
          "photo": "images/students/boichuk.jpg"
        },
        {
          "name": "Viacheslav Olishchuk",
          "websiteUrl": "https://olishchuk1.github.io/my-project-v2/",
          "codeSourceUrl": "https://github.com/olishchuk1/my-project-v2",
          "cvUrl": "https://www.linkedin.com/in/vyacheslav-olishchuk-7b08a814a/",
          "photo": "images/students/olishchuk.jpg"
        },
        {
          "name": "Nataliya Kostikova",
          "websiteUrl": "https://nata321.github.io/artgallery/",
          "codeSourceUrl": "https://github.com/nata321/artgallery",
          "cvUrl": "https://www.linkedin.com/in/nataliya-kostikova-263806140/",
          "photo": "images/students/kostikova.jpg"
        },
        {
          "name": "Olexandr Zhytenko",
          "websiteUrl": "https://alexandrzhytenko.github.io/web-site-studying-web-development/",
          "codeSourceUrl": "https://github.com/AlexandrZhytenko/web-site-studying-web-development",
          "cvUrl": "https://www.linkedin.com/in/olexandr-zhytenko-032b6a3a/",
          "photo": "images/students/zhytenko.jpg"
        },
        {
          "name": "Olha Plekan",
          "websiteUrl": "https://olga29pl.github.io/my_first_page/",
          "codeSourceUrl": "https://github.com/olga29pl/my_first_page",
          "cvUrl": "https://www.linkedin.com/in/olha-plekan-21a315149/",
          "photo": "images/students/plekan.jpg"
        },
        {
          "name": "Andrii Osetrov",
          "websiteUrl": "https://andrii-osetrov.github.io/my-project/",
          "codeSourceUrl": "https://github.com/andrii-osetrov/my-project/",
          "cvUrl": "",
          "photo": "images/students/osetrov.jpg"
        },
        {
          "name": "Andrii Zabolotnyi",
          "websiteUrl": "https://clstnature.github.io/my-site/",
          "codeSourceUrl": "https://github.com/clstnature/my-site/",
          "cvUrl": "",
          "photo": "images/students/zabolotnyi.jpg"
        },
        {
          "name": "Bohdan Buherchuk",
          "websiteUrl": "https://buherchuk.github.io/MyProgect/",
          "codeSourceUrl": "https://github.com/Buherchuk/MyProgect",
          "cvUrl": "https://www.linkedin.com/in/богдан-бугерчук-a0798114a/",
          "photo": "images/students/buherchuk.jpg"
        },
        {
          "name": "Maksym Tsvirinkalo",
          "websiteUrl": "https://maks4577.github.io/website/",
          "codeSourceUrl": "https://github.com/maks4577/website",
          "cvUrl": "https://www.linkedin.com/in/maksym-tsvirinkalo-5b496b14a/",
          "photo": "images/students/tsvirinkalo.jpg"
        },
        {
          "name": "Roksolana Babii",
          "websiteUrl": "https://projectm-roksolanababiy.c9users.io/index.html",
          "codeSourceUrl": "https://roksolanababiy.github.io/git/",
          "cvUrl": "",
          "photo": "images/students/babii.jpg"
        },
        {
          "name": "Taras Stakhovskyi",
          "websiteUrl": "https://browncostume.github.io/hopster-pub/",
          "codeSourceUrl": "https://github.com/browncostume/hopster-pub/",
          "cvUrl": "",
          "photo": "images/students/stakhovskyi.jpg"
        },
        {
          "name": "Yuliia Morska",
          "websiteUrl": "https://thebeautyblogger-yuliiamorska.c9users.io/index.html",
          "codeSourceUrl": "https://thebeautyblogger-yuliiamorska.c9users.io/index.html",
          "cvUrl": "",
          "photo": "images/students/morska.jpg"
        }
      ];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(students);
        }
    };
}]);
