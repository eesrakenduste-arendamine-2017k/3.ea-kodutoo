class Calculator {
    constructor() {

        this.operators = ['+', '-', 'x', '÷'];
        this.tmpScreen = '';
        this.inputMode = false;
        this.inputModeCleared = false;
        this.inputModeOperation = false;
        this.inputModeOperationBase = '';
        this.inputModeLastVal = '';
        var config = {
    apiKey: "AIzaSyDj8MT8r1iQynTyTJKIA6glEP8yjHW-4mY",
    authDomain: "ea-kalkulaator.firebaseapp.com",
    databaseURL: "https://ea-kalkulaator.firebaseio.com",
    projectId: "ea-kalkulaator",
    storageBucket: "ea-kalkulaator.appspot.com",
    messagingSenderId: "443975090398"
  };
  firebase.initializeApp(config);
    }

    init() {

        var keys = document.querySelectorAll('#calculator span');
        var decimalAdded = false;

        for(var i = 0; i < keys.length; i++) {
            if ($(keys[i]).hasClass('insert') || $(keys[i]).hasClass('calculation')) {
                continue;
            }

            $(keys[i]).click((e) => {
                var _this = e.currentTarget;
                var input = document.querySelector('.screen');
                var inputVal = input.innerHTML;
                var btnVal = _this.innerHTML;

                if (btnVal == 'C') {
                    this.closeInputModeIfNeeded();
                    input.innerHTML = '';
                    this.decimalAdded = false;
                } else if(btnVal == '=') {
                    if (this.inputMode) {
                        this.inputModeOperation();
                    } else {
                        this.solve(inputVal);
                    }

                } else if (this.operators.indexOf(btnVal) > -1) {
                    this.closeInputModeIfNeeded();
                    var lastChar = inputVal[inputVal.length - 1];
                    if(inputVal != '' && this.operators.indexOf(lastChar) == -1) {
                        input.innerHTML += btnVal;
                    } else if(inputVal == '' && btnVal == '-') {
                        input.innerHTML += btnVal;
                    }
                    if (this.operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                        input.innerHTML = inputVal.replace(/.$/, btnVal);
                    }
                    this.decimalAdded = false;

                } else if (btnVal == '.') {
                    if (!this.decimalAdded) {
                        if (this.inputMode && this.inputModeCleared == false) {
                            input.innerHTML = '';
                            this.inputModeCleared = true;
                        }

                        input.innerHTML += btnVal;
                        this.decimalAdded = true;
                    }

                } else {
                    if (this.inputMode && this.inputModeCleared == false) {
                        input.innerHTML = '';
                        this.inputModeCleared = true;
                    }

                    input.innerHTML += btnVal;
                }

                e.preventDefault();

            });
        }

        $('.insert').click((e) => this.eventInsert(e));
        $('.calculation').click((e) => this.eventCalculation(e));
    }

    eventInsert(e) {

        let $this = $(e.currentTarget);

        this.insert($this.attr('value'));
    }

    eventCalculation(e) {

        let $this = $(e.currentTarget);
        this.inputModeOperationBase = $this.attr('operation');
        let solve = () => {

            let calculation = this.inputModeOperationBase;

            if (this.inputMode) {

                this.closeInputMode(false);
                calculation = calculation.replace('y', ''+this.inputModeLastVal+'');
            }

            let screenVal = $('.screen').html();

            calculation = 'Calculator.round('+calculation.replace('x', ''+screenVal+'')+', 8)';

            this.solve(calculation);
        }

        if (this.inputModeOperationBase.indexOf('y') != -1) {

            this.openInputMode($this.attr('inputMessage'));
            this.inputModeOperation = solve;

        } else {

            solve();
        }
    }

    closeInputModeIfNeeded() {

        if (!this.inputMode) {

            return;
        }

        this.closeInputMode(false);
    }

    closeInputMode(animated = true) {

        let $screen = $('.screen');
        this.inputMode = false;
        this.inputModeLastVal = $screen.html();

        if (!animated) {

            $screen.html(this.tmpScreen);
            $screen.removeClass('inputMode');

        } else {

            $screen.fadeOut().then(() => {

                $screen.removeClass('inputMode');
                $screen.html(this.tmpScreen);
                $screen.fadeIn();
            });
        }
    }

    static round(value, decimals) {

        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }


    openInputMode(message, func) {

        if (this.inputMode) {

            return;
        }

        var $screen = $('.screen');

        this.tmpScreen = $screen.html();
        $screen.html(message);
        $screen.addClass('inputMode');
        $screen.fadeOut().fadeIn();

        this.inputModeCleared = false;
        this.inputModeOperation = func;
        this.inputMode = true;
    }

    insert(value) {

        $('.screen').html($('.screen').html() + value);
    }




    solve(inputVal) {

        var clientIp = "";
        var clientCountry = "";
        var input       = document.querySelector('.screen');
        var equation    = inputVal;
        var lastChar    = equation[equation.length - 1];
        equation        = equation.replace(/x/g, '*').replace(/÷/g, '/');

        if (this.operators.indexOf(lastChar) > -1 || lastChar == '.') {
            equation = equation.replace(/.$/, '');
        }

        if (equation) {
            input.innerHTML = new Function('return ' + equation)();
        }

        this.decimalAdded = false;
    }
}
