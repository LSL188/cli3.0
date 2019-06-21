export default {
    data() {
        const checkEmail = (rule, value, callback) => {
            if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)) {
                callback()
            } else {
                callback(new Error('邮箱格式不正确'))
            }
        }

        const checkMobile = (rule, value, callback) => {
            if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)) {
                callback()
            } else {
                callback(new Error('手机格式不正确'))
            }
        }

        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 4
            },
            userlist: [],
            total: 0,
            addUserDialogVisible: false,
            addUserForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            addUserFormRules: {
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
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }, {
                    validator: checkEmail,
                    trigger: 'blur'
                }],
                mobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    validator: checkMobile,
                    trigger: 'blur'
                }]
            },
            editUserDialogVisible: false,
            editUserForm: {},
            editUserFormRules: {
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }, {
                    validator: checkEmail,
                    trigger: 'blur'
                }],
                mobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    validator: checkMobile,
                    trigger: 'blur'
                }]
            },
            userInfo: {},
            setRoleDialogVisible: false,
            rolelist: [],
            selectRoleId: ''
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const {
                data: res
            } = await this.$http.get('/users', {
                params: this.queryInfo
            })
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
            this.userlist = res.data.users
            this.total = res.data.total
        },
        async changed(id, state) {
            console.log(id, state)
            const {
                data: res
            } = await this.$http.put(`users/${id}/state/${state}`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('修改用户状态失败！')
            // this.$message.success('修改用户状态成功！')
        },
        handleSizeChange(size) {
            console.log(size)
            this.queryInfo.pagesize = size
            this.getUserList()
        },
        handleCurrentChange(num) {
            console.log(num)
            this.queryInfo.pagenum = num
            this.getUserList()
        },
        resetUser() {
            this.$refs.addUserFormRef.resetFields()
            this.addUserDialogVisible = false
        },
        addUser() {
            this.$refs.addUserFormRef.validate(async valid => {
                if (!valid) return
                const {
                    data: res
                } = await this.$http.post('users', this.addUserForm)
                console.log(res)
                if (res.meta.status !== 201) return this.$message.error('添加用户失败！')
                this.$message.success('添加用户成功！')
                this.addUserDialogVisible = false
                this.getUserList()
            })
        },
        async editUser(id) {
            console.log(id)
            const {data: res} = await this.$http.get(`users/${id}`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取编辑用户信息失败！')
            this.editUserForm = res.data
            this.editUserDialogVisible = true
        },
        resetEditUser() {
           this.editUserForm = {}
           this.$refs.editUserFormRef.resetFields()
           this.editUserDialogVisible = false
        },
        savedEditUser() {
            this.$refs.editUserFormRef.validate(async valid => {
                if (!valid) return
                const {data: res} = await this.$http.put(`users/${this.editUserForm.id}`, this.editUserForm)
                console.log(res)
                if (res.meta.status !== 200) return this.$message.error('保存编辑失败！')
                this.$message.success('保存编辑成功！')
                this.editUserDialogVisible = false
                this.getUserList()
            })
        },
        async remove(id) {
            console.log(id)
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(err => err)

              if (confirmResult !== 'confirm') {
                return this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });   
              }

              const {data: res} = await this.$http.delete(`users/${id}`)
              console.log(res)
              if (res.meta.status !== 200) return this.$message.error('删除用户失败！')
              this.$message.success('删除用户成功！')
              this.getUserList()
        },
        async setRole(user) {
            console.log(user)
            this.userInfo = user
            const {data: res} = await this.$http.get('/roles')
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('查询角色列表失败！')
            this.rolelist = res.data
            this.setRoleDialogVisible = true
        },
        resetRole() {
            this.rolelist = []
            this.selectRoleId = ''
            this.setRoleDialogVisible = false
        },
        async savedRole() {
            if (this.selectRoleId === '') return this.$message.error('请选择角色后再保存！')
            const {data: res} = await this.$http.put(`users/${this.userInfo.id}/role`, {rid: this.selectRoleId})
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('保存分配角色失败！')
            this.$message.success('保存分配角色成功！')
            this.getUserList(
            this.setRoleDialogVisible = false
            )
        }
    }
}