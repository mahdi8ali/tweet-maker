<template>
  <div>

     <section>
      <div class="container">
        <div class="row ">
          <div class="col-md-4">
            <div class="settings p-4">
               <hr>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" v-model="dark" value="true" checked>
                  <span class="p-4">Dark Theme</span>
                </label>
              </div>
              <br>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" v-model="vi" value="true" checked>
                  <span class="p-4">موثق</span>
                </label>
              </div>
              <div class="form-group">
                <label for="">الصورة</label>
                <input type="file" class="form-control-file" @change="onFileChange">
              </div>
              <div class="form-group">
                <label for="">الاسم</label>
                <input type="text" class="form-control" v-model="name" aria-describedby="helpId" placeholder="">
              </div>
              <div class="form-group">
                <label for="">اسم المستخدم</label>
                <input type="text" class="form-control" v-model="username" aria-describedby="helpId" placeholder="">
              </div>
              <div class="form-group">
                <label for="">التأريخ</label>
                <input type="date" class="form-control" v-model="date" aria-describedby="helpId" placeholder="">
              </div>
              <div class="form-group">
                <label for="">النص</label>
                <textarea class="form-control" v-model="text" rows="3"  placeholder="النص"></textarea>
              </div>
              <div class="form-group">
                <label for="">الجهاز</label>
                <select class="form-control" v-model="platform" @change="changePlatform(platform)" id="">
                  <option>Android</option>
                  <option>iPhone</option>
                  <option>web app</option>
                </select>
              </div>
              <hr>
               <button class="btn btn-default" @click="print">تصدير</button>
            </div>

          </div>
          <div class="col-md-8">

            <div class="main-div" ref="printMe" :class="{'dark':dark,'light':!dark}">
              <div class="content">

                <div class="title">
                  <div class="img-content">
                    <img :src="url" alt="">
                  </div>
                  <div class="names-username">
                    <div class="names">
                      <span class="name">{{name}} </span>
                      <div class="dark-icon" v-if="vi">
                        <img v-if="dark" src="@/assets/img/vi.png" alt="" width="16">
                        <img v-if="!dark" src="@/assets/img/vi-li.png" alt="" width="16">
                      </div>
                    </div>
                    <div class="username">
                      <p style="word-wrap: normal;direction:rtl">@{{username}}</p>
                    </div>
                  </div>
                </div>
                <div class="main-text">
                  <span style="text-align: right;word-wrap: normal;white-space: pre;">
                    {{text.replaceAll(/ /g, "&nbsp;")}}
                  </span>
                </div>
                <div class="details">
                  <span>
                    Twitter for {{platform}} .
                  </span>
                  <span>
                    {{date | dateFormat}}
                  </span>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

  </div>

</template>

<script>

  import moment from 'moment';

  export default {
    data() {
      return {
        output: null,
        dark: true,
        name: 'ثورة فدك',
        username: 'thawra_fadak',
        image: '',
        date: new Date(),
        text: 'النص هنا',
        platform: 'iphone',
        url:require('./assets/img/me.jpg'),
        vi:true
      }
    },
    filters: {
      dateFormat(value) {
        return moment(String(value)).format('MMM D , Y · hh:mm A')
      }
    },
    methods: {
      async print() {
        const el = this.$refs.printMe;
        // add option type to get the image version
        // if not provided the promise will return 
        // the canvas.
        const options = {
          type: 'dataURL',
          letterRendering:false
        }
        this.output = await this.$html2canvas(el, options);
      
        const link = document.createElement('a');
        link.href =this.output;
        link.download = this.username+'_tweet.jpeg';
        link.click();
        URL.revokeObjectURL(link.href);
      },
      getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      },
      changePlatform(val) {
        this.platform = val;
      },
      onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
      }
    }
  }
  
</script>
<style lang="css">
  .settings {
    border-left: 2px solid #ccc;
    height: 100vh;
  }

  .dark {
    background-color: #15212b;
  }

  .light {
    background-color: #ffffff;
  }

  .light .name,
  .light .main-text span {
    color: #15212b !important;
  }
</style>