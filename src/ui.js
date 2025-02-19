// had to use setTimeout to make it work, not sure why
setTimeout(() => {
    let powermeter_calc_sheet = new Vue({
        el: "#yh-root",
        data: function data() {return {
            message: "Hello Vue!"
        }},
    });
}, 1);

export default "";
