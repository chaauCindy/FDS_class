<template lang="pug">
  #app.container
    .columns
      .column.is-8.is-offset-2
        .field
          label.label(for='user_name') 이름
          p.control
            input#user_name.input(type='text', placeholder='이민기' :value="user.name" @input="detectEventBinding('name', $event)")
        .field
          label.label(for='user_id') 아이디
          p.control.has-icon.has-icon-right
            //- // is-success
            input#user_id.input(type='text', placeholder='lee-MK')
        //-     //
        //-       <span class="icon is-small" aria-label="사용 가능">
        //-       <i class="fa fa-check" aria-hidden="true"></i>
        //-       </span>
        //-   // <p class="help is-success">입력한 아이디는 사용 가능합니다.</p>
        //- // ///// 이메일 예시 /////
        .field
          label.label(for='user_email') 이메일
          p.control.has-icon.has-icon-right
            //- // is-danger
            input#user_email.input(type='text', placeholder='user@host.io' v-model.lazy.trim="user.email")
          //-   //
          //-     <span class="icon is-small" aria-label="양식 오류">
          //-     <i class="fa fa-warning" aria-hidden="true"></i>
          //-     </span>
          //- // <p class="help is-danger">입력된 이메일 양식이 잘못되었습니다.</p>
        //- // ///// 라디오버튼 예시 /////
        .field
          label.label(for='user_career') 경력 여부
          p.control
            label.radio
              input#user_career(type='radio', name='role', value='junior', v-model="user.role")
              | 신입
            label.radio
              input(type='radio', name='role', value='senior' v-model="user.role")
              | 경력자
        //- // ///// 넘버(숫자) 인풋 예시 /////
        .field(v-show="user.role === 'senior'")
          label.label(for='user_senior_career') 경력 연차
          p.control
            input#user_senior_career.input(type='number', min='1', max='50' v-model.number="user.career")
        //- // ///// 체크박스 예시 /////
        .field
          label.label(for='user_field') 지원 분야
          p.control
            label.checkbox
              input#user_field(value='plan', type='checkbox' v-model="user.field")
              | 기획
          p.control
            label.checkbox
              input(value='design', type='checkbox' v-model="user.field")
              | 웹 디자인
          p.control
            label.checkbox
              input(value='frontend', type='checkbox' v-model="user.field")
              | 프론트엔드 개발
          p.control
            label.checkbox
              input(value='backend', type='checkbox' v-model="user.field")
              | 백엔드 개발
        //- // ///// 셀렉트 메뉴 예시 /////
        .field
          label.label(for='user_field') 지원 분야
          p.control
            span.select
              select#user_field(v-model="user.selected")
                option(v-for="field in field_options" :value="field.value" :disabled="!field.value") {{ field.text }}

        //- // ///// 텍스트 영역 예시 /////
        .field
          label.label(for='user_message') 내용
          p.control
            textarea#user_message.textarea(placeholder='주제와 관련 내용을 입력해주세요.'  :value="user.message" @input="detectEventBinding('message', $event)")
        //- // ///// 체크박스 예시 /////
        .field
          p.control
            label.checkbox(for='user_remember')
              input#user_remember(type='checkbox' v-model="user.remember")
              | 입력한 사용자 정보를 기억합니다.
        .field.is-grouped
          p.control
            button.button.is-primary(type='submit') 전송
          p.control
            button.button.is-link(type='reset') 취소

</template>

<script>
let field_options = [
  {text : '지원 분야를 선택해주세요.', value: ''},
  {text : '기획', value: 'plan'},
  {text : '웹 디자인', value: 'design'},
  {text : '프론트엔드 개발', value: 'frontend'},
  {text : '백엔드 개발', value: 'backend'},
  {text : '풀스택 개발', value: 'fullstack'},
];

export default {
  name: 'app',  //- component name
  data () {     //- component data
    return {
      field_options,
      user:{
        name : '',
        message : '',
        role : 'junior',
        field: ['frontend'], //- 다중 체크박스
        remember: false,  //- 단일 체크박스
        selected: '',
        email : '',
        career : 1
      }
    }
  },
  methods: {
    detectEventBinding(input, e){
       this.user[input] = e.target.value;
    }
  }
}
</script>

<style lang="sass"> 
//- <style lang="sass" scoped> // component #ID scoped
html
  font-size: 100%
  background: #fff
body
  margin: 0
#app
  padding: 20px
</style>
