export default {
    data() {
        return {
            powerlist: []
        }
    },
    created() {
        this.getPowerList()
    },
    methods: {
        async getPowerList() {
            const {data: res} = await this.$http.get(`rights/list`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('获取权限列表失败！')
            this.powerlist = res.data
        }
    }
}
