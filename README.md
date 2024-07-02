# maucash

> maucash项目常用组件(基于vue+iview框架)

### 一、安装及配置

```bash
# install dependencies
npm install maucash --save

# main.js中使用插件
import Maucash from 'maucash';
Vue.use(Maucash);
```

### 二、登录组件
* 1、示意图
  ![login](./static/login.png)
* 2、组件使用方式

  ```html
  <maucash-login />
  ```
* 3、关于参数
  * `baseUrl:String` 不同环境下的url地址
  * `imgUrl: String` 图片的url地址
  * `headers:Object` 请求头
  * `isSms:Boolean` 是否显示短信验证码(线下放款不需要)
  * `isLogInfo:Boolean` 登录页面中文字提示(审批系统需要提示)
* 4、事件
  * `loginHandle:Function` 登录获取用户的`token`等参数

### 三、日期范围选择

* 1、示意图
  ![date-picker](./static/date-picker.png)

* 2、使用方式

  ```html
  <date-picker />
  ```

* 3、参数
  * `format: String` 时间显示格式
  * `placeholder: String` 日期选择输入框的文字提示

* 4、事件
  * `confirm-date:Function` 获取选择的时间


### 四、主页图例数据

* 1、使用方式

  ```html
  <maucash-value-count :valueCountArray="valueCountArray" @confirm-date="confirmDate" :title="'Key Statistics'" :format="'dd-MM-yyyy'"/>
  ```

* 2、参数
  * `valueCountArray: Array` 数据
  * `title: String` 标题
  * `format: String` 时间格式

* 3、事件
  * `confirm-date: Function` 用户选择的时间

### 五、弹框组件

* 1、使用方式

  ```html
  <maucash-modal ref="modal" :modalForm="formTop" :rulesForm="rulesForm" @fetchData="fetchData">
    <FormItem label="Name" prop="applyName">
      <Input v-model="formTop.applyName" placeholder="Placeholder loan name" :maxlength="255"></Input>
    </FormItem>
    <FormItem label="Mobile" prop="mobile">
      <Input v-model="formTop.mobile" placeholder="placeholder loan mobile" :maxlength="255"></Input>
    </FormItem>
    <FormItem label="NIK" prop="nik">
      <Input v-model="formTop.nik" placeholder="placeholder nik" :maxlength="255"></Input>
    </FormItem>
  </maucash-modal>
  ```

* 2、参数说明
  * `modalType: String`: 弹框类型(默认`form`,随便传入有别的值下面就会显示取消与确认按钮)
  * `title: String`: 弹框标题
  * `modalForm: Object`: 弹框内表单内容
  * `rulesForm?:Object`: 规则
  * `modelWidth?:Number`: 弹框宽度

* 3、事件
  * `fetchData()`: 点击确认/ok的按钮