import errImg from '../assets/fail.png'
import successImg from '../assets/success.png'
import Vue from 'vue'
export const successMsg = (info) => {
  Vue.prototype.$alert(
    `<div>
      <div style='text-align:center'><img src='${successImg}'></div>
      <div style='color:#09e0a6;'>${info}</div>
    </div>`,
    '提示', {
      dangerouslyUseHTMLString: true,
      center: true,
      showConfirmButton: true,
      confirmButtonText: '确定',
      confirmButtonClass: 'lightBlueBtn',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          done()

        } else {
          done()
        }
      }
    })
}

export const errorMsg = (info) => {
  Vue.prototype.$alert(
    `<div>
      <div style='text-align:center'><img src='${errImg}'></div>
      <div style='color:#f03e3e;'>${info}</div>
    </div>`,
    '提示', {
      dangerouslyUseHTMLString: true,
      center: true,
      showConfirmButton: true,
      confirmButtonText: '确定',
      confirmButtonClass: 'lightBlueBtn',
      beforeClose: (action, instance, done) => {
        done()
      }
    })
}
