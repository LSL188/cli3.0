export default {
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            loginFormRules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
            }
        }
    },
    methods: {
        reset() {
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return
                const {data: res} = await this.$http.post('/login', this.loginForm)
                console.log(res)
                if (res.meta.status !== 200) return this.$message.error('登录失败！')
                this.$message.success('登陆成功！')
                window.sessionStorage.setItem('token', res.data.token)
                this.$router.push('/home')
            })
        }
    }
}