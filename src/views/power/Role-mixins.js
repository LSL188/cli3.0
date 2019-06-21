import { __rest } from "tslib";

export default {
    data() {
        return {
            rolelist: [],
            addRoleDialogVisible: false,
            addRoleForm: {
                roleName: '',
                roleDesc: ''
            },
            addRoleRules: {
                roleName: [{
                    required: true,
                    message: '请输入角色名称',
                    trigger: 'blur'
                }],
                roleDesc: [{
                    required: true,
                    message: '请输入角色描述',
                    trigger: 'blur'
                }]
            },
            editRoleDialogVisible: false,
            editRoleForm: {},
            editRoleRules: {
                // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
                // roleDesc: [{required: true, message: '请输入角色描述', trigger: 'blur'}]
            },
            setPowerDialogVisible: false,
            treelist: [],
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            defaultCheckKey: [],
            selectRoleId: ''
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            const {
                data: res
            } = await this.$http.get('roles')
            // console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取角色列表失败！')
            this.rolelist = res.data
        },
        resetAddRole() {
            this.$refs.addRoleRef.resetFields()
            this.addRoleDialogVisible = false
        },
        saveAddRole() {
            this.$refs.addRoleRef.validate(async valid => {
                if (!valid) return
                const {
                    data: res
                } = await this.$http.post(`roles`, this.addRoleForm)
                console.log(res)
                if (res.meta.status !== 201) return this.$message.error('添加角色失败！')
                this.$message.success('添加角色成功！')
                this.addRoleDialogVisible = false
                this.getRoleList()
            })
        },
        async editRole(roleId) {
            console.log(roleId)
            const {
                data: res
            } = await this.$http.get(`roles/${roleId}`, {
                params: this.editRoleForm
            })
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取当前编辑的角色信息失败！')
            this.editRoleForm = res.data
            this.editRoleDialogVisible = true
        },
        resetEditRole() {
            this.editRoleForm = {}
            this.editRoleDialogVisible = false
        },
        async saveEditRole() {
            const {
                data: res
            } = await this.$http.put(`roles/${this.editRoleForm.roleId}`, this.editRoleForm)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('保存编辑角色失败！')
            this.$message.success('保存编辑角色成功！')
            this.editRoleDialogVisible = false
            this.getRoleList()
        },
        async removeRole(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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

            const {
                data: res
            } = await this.$http.delete(`roles/${id}`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('删除角色失败！')
            this.$message.success('删除角色成功！')
            this.getRoleList()
        },
        async setPower(role) {
            this.selectRoleId = role.id
            const {data: res} = await this.$http.get(`rights/tree`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取所有树状权限列表失败！')
            this.treelist = res.data
            const k = []
            this.getLeafId(role, k)
            console.log(k)
            this.defaultCheckKey = k
            this.setPowerDialogVisible = true
        },
        getLeafId(node, keys) {
            if (!node.children) {
                keys.push(node.id)
            } else {
                node.children.forEach(item => this.getLeafId(item,keys))
            }
        },
        resetSetPower() {
            this.selectRoleId = ''
            this.treelist = []
            this.defaultCheckedKey = []
        },
        async saveSetPower() {
            const arr1 = this.$refs.tree.getCheckedKeys()
            const arr2 = this.$refs.tree.getHalfCheckedKeys()
            const rids = [...arr1, ...arr2].join(',')
            const {data: res} = await this.$http.post(`roles/${this.selectRoleId}/rights`, rids)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('保存分配权限失败！')
            this.$message.success('保存分配权限成功！')
            this.setPowerDialogVisible = false
            this.getRoleList()
        },
        async removeNowPower(role, powerId) {
            console.log(role)
            console.log(powerId)
            const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
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

            const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${powerId}`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('删除展开行中的权限失败！')
            this.$message.success('删除展开行中的权限成功！')
            role.children = res.data
        }
    }
}