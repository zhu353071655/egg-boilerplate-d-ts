'use strict';

import { Controller, Context } from 'egg';
import { formatDate } from '~/app/lib/utils';

function validate() {
  return (_target: HomeController, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldAsyncFunc = descriptor.value;
    descriptor.value = async function(ctx: Context) {
      console.info('validate in', propertyKey, ctx.app.config.HOME);
      console.info('validate in', propertyKey, ctx.app.config.logger.aaaa); // 这个关联不了
      console.info('validate in', propertyKey, ctx.app.config.test2.aa); // 这个可以关联
      await oldAsyncFunc.call(this, ctx);
    };
  };
}

export default class HomeController extends Controller {
  @validate()
  public async index() {
    const { ctx, service } = this;
    const time = service.time.today();
    this.app.logger.info(ctx.app.model.User.getData());
    this.app.logger.info(ctx.app.model.Castle.getData());
    this.app.logger.info(`request visit in ${formatDate(new Date())}`);
    this.app.logger.info(this.ctx.helper.test().ip);

    if (ctx.isAjax()) {
      ctx.body = { time };
    } else {
      ctx.body = `
      <div style="text-align: center;font-size: 24px;padding: 30px 0;">
        ${this.config.local ? this.config.local.msg : ''} <span id="time">${time}</span>
      </div>
      <script>
        setInterval(function() {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/');
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          xhr.send();
          xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              document.getElementById('time').innerText = JSON.parse(xhr.responseText).time;
            }
          }
        }, 1000);
      </script>
      `;
    }
  }

  public async error() {
    throw new Error('see the error stack!!');
  }
}
