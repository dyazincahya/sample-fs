const ObservableArray = require("data/observable-array").ObservableArray;

function MainViewModel(items) {
    var viewModel = new ObservableArray(items);

    /* Make your code here */

    return viewModel;
}

module.exports = MainViewModel;
