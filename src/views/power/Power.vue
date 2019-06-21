<template>
  <div class="power-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="powerlist" border stripe height="450">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级">
                <template slot-scope="scope">
                    <el-tag type="primary" v-if="scope.row.level == 0">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level == 1">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import mix from "./Power-mixins.js";
export default {
  mixins: [mix]
};
</script>
