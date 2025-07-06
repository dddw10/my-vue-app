<script setup>
import { reactive,getCurrentInstance } from "vue";
import { useloginStore } from "../store/loginStore";
import { useRouter } from "vue-router";
const router = useRouter()
const loginStore = useloginStore()
const loginFrom = reactive({
    account:'',
    password:''
})
const {proxy} = getCurrentInstance()
async function into(val){
    const res = await proxy.$api.getMenu(val)
    //通过pinia，实现跨组件传值
    loginStore.getMenuList(res.menu)
    loginStore.token = res.token
    loginStore.addMenu(router)
    router.push('/home')
}
</script>
<template>
    <div class="login">
        <el-form :model="loginFrom" class="form">
            <h1>欢迎登录</h1>
            <el-form-item>
                <el-input v-model="loginFrom.account" placeholder="请输入账号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input  type="password" show-password clearable v-model="loginFrom.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="into(loginFrom)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
.login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/images/img.jpg);
    background-size: 100%;
    overflow: hidden;
}
.form{
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 20px;
    box-shadow: 0 0 25px #cacaca;
    margin-bottom: 10%;
    padding: 25px 25px 15px 25px;
    h1{
        padding: 20px;
        font-size: 20px;
    }
}
.el-form-item{
    width: 80%;
}
:deep(.el-form-item__content){
    justify-content: center;
}
</style>