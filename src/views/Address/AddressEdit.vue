<template>
    <div>
        <van-nav-bar :title="isEdit ? '新增地址' : '编辑地址'" left-arrow @click-left='$router.back()' fixed>
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <van-address-edit :area-list="areaList" show-postal :show-delete="isEdit ? false : true" show-set-default
            :address-info="info" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
    </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { Toast } from 'vant';
import { getAddressDetail, updateAddress, addAddress, deleteAddress } from "../../api/index";
export default {
    data() {
        return {
            isEdit: true,
            areaList: Object.freeze(areaList),
            searchResult: [],
            info: {},  //回显数据
        };
    },
    created() {
        this.id = this.$route.query.addressId;
        if (this.id) {
            this.getDetail();
            this.isEdit = false;
        }
    },
    methods: {
        getAreaCode(area) {
            area = area.replace(/区|县/, "");
            for (let k in areaList.county_list) {
                if (areaList.county_list[k].includes(area)) {
                    return k;
                }
            }
        },
        async getDetail() {
            // 根据id请求地址详情
            let data = await getAddressDetail(this.id);
            console.log(data);
            let {
                addressId,
                cityName,
                defaultFlag,
                detailAddress,
                provinceName,
                regionName,
                userId,
                userName,
                userPhone,
            } = data.data;
            this.info = {
                id: addressId,
                name: userName,
                tel: userPhone,
                province: provinceName,
                city: cityName,
                county: regionName,
                addressDetail: detailAddress,
                postalCode: "100000",
                areaCode: this.getAreaCode(regionName),
                isDefault: defaultFlag,
            };
        },
        onSave(obj) {
            // 走那个接口？新增还是编辑
            let {
                addressDetail,
                areaCode,
                city,
                country,
                county,
                id,
                isDefault,
                name,
                postalCode,
                province,
                tel,
            } = obj;
            let option = {
                cityName: city,
                defaultFlag: isDefault ? 1 : 0,
                detailAddress: addressDetail,
                provinceName: province,
                regionName: county,
                userName: name,
                userPhone: tel,
                areaCode,
                postalCode,
            };
            if (this.id) {
                // 调用编辑接口
                updateAddress({
                    addressId: id,
                    ...option,
                }).then((data) => {
                    // 编辑成功之后回到 地址列表页
                    this.$router.push({
                        path: "/addressList", query: {
                            cartItemIds: this.$route.query.cartItemIds
                        }
                    });
                });
            } else {
                // 调用新增接口
                addAddress({
                    ...option,
                }).then(() => {
                    this.$router.push("/addressList");});
            }
        },
        onDelete() {
            deleteAddress(this.$route.query.addressId).then((res) => {
                console.log(res);
                if (res.resultCode == 200) {
                    Toast(res.message);
                    this.$router.replace("/addressList");
                }
            });
        },
    },
};
</script>

<style scoped lang="less">
.van-address-edit {
    margin-top: 1.6rem;
}

.van-address-edit__fields {
    margin-top: 1.6rem;
}

/deep/.van-button--danger {
    background-color: aqua;
    border: 0;
}
</style>