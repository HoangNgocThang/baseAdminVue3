<template>
  <slot>
    <a-form ref="ruleForm21" :model="filters21" layout="vertical">
      <a-card style="width: 100%;border: none">
        <span class="title-register">Thông tin người phụ trách</span>
        <p class="sub-title-register" style="margin-top: 20px">Người đại diện 1</p>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Họ và tên"
                name="repFullName"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Họ và tên"
                  v-model:value="filters21.repFullName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Chức vụ"
                name="repPosition"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  v-model:value="filters21.repPosition">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Người liên hệ</a-select-option>
                <a-select-option :value="2" :key="2">Phó giám đốc</a-select-option>
                <a-select-option :value="3" :key="3">Kế toán trưởng</a-select-option>
                <a-select-option :value="4" :key="4">Kế toán viên</a-select-option>
                <a-select-option :value="5" :key="5">Phó chủ tịch</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                name="repDob"
                label="Ngày sinh"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-date-picker
                  :allowClear="false"
                  v-model:value="filters21.repDob"
                  format="DD/MM/YYYY"
                  style="width: 100%"
                  placeholder="Ngày sinh"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc tịch"
                name="nationalityId"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Nơi cấp"
                  v-model:value="filters21.nationalityId"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Tên viết tắt"
                name="repShortName"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Tên viết tắt"
                  v-model:value="filters21.repShortName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Loại GTTT"
                name="identityType"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-select style="color: black" v-model:value="filters21.identityType">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Chứng minh nhân dân</a-select-option>
                <a-select-option :value="2" :key="2">Căn cước công dân</a-select-option>
                <a-select-option :value="3" :key="3">Hộ chiếu</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Số GTTT"
                name="identityNumber"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Số GTTT"
                  v-model:value="filters21.identityNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="repMobileNumber"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di dộng"
                  v-model:value="filters21.repMobileNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="repEmail"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email"
                  v-model:value="filters21.repEmail"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc gia"
                name="nationId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters21.nationId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="84" :key="84">Việt Nam</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Tỉnh/ Thành phố"
                name="provinceId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters21.provinceId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in province21"
                    :value="item?.provinceCode"
                    :key="item?.provinceCode">{{ item?.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quận/ Huyện"
                name="districtId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters21.districtId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in district21"
                    :value="item?.districtCode"
                    :key="item?.districtCode">{{ item?.districtName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Phường/ Xã"
                name="communeId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters21.communeId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in commune21"
                    :value="item?.communeCode"
                    :key="item?.communeCode">{{ item?.communeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Địa chỉ"
                name="fullAddress"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Số nhà, tên đường"
                  v-model:value="filters21.fullAddress"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <div style="display: flex;flex-direction: column; gap: 8px">
          <a-button
              v-if="!showFilters22"
              type="primary"
              @click="()=> { showFilters22 = true }"
              style="display: flex; justify-content: center;align-content: center; background-color: rgba(245, 154, 35, 1); width: 185px">
            <plus-outlined style="padding: 0;margin-top: 4px; margin-right: 2px"/>
            Thêm người đại diện
          </a-button>
          <a-button
              v-if="!showFilters23 && !showFilters22"
              type="primary"
              @click="()=> {  showFilters23 = true }"
              style="display: flex; justify-content: center;align-content: center; background-color: rgba(245, 154, 35, 1); width: 185px">
            <plus-outlined style="padding: 0;margin-top: 4px"/>
            Thêm người ủy quyền
          </a-button>
        </div>
      </a-card>
    </a-form>

    <a-form v-if="showFilters22" ref="ruleForm22" :model="filters22" layout="vertical">
      <a-card style="width: 100%;border: none">
        <div style="display: flex;flex-direction: row; justify-content: space-between; align-items: start">
          <p class="sub-title-register">Người đại diện 2</p>
          <a-button @click="()=> { showFilters22 =false}">Xóa</a-button>
        </div>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Họ và tên"
                name="repFullName"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Họ và tên"
                  v-model:value="filters22.repFullName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Chức vụ"
                name="repPosition"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  v-model:value="filters22.repPosition">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Người liên hệ</a-select-option>
                <a-select-option :value="2" :key="2">Phó giám đốc</a-select-option>
                <a-select-option :value="3" :key="3">Kế toán trưởng</a-select-option>
                <a-select-option :value="4" :key="4">Kế toán viên</a-select-option>
                <a-select-option :value="5" :key="5">Phó chủ tịch</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                name="repDob"
                label="Ngày sinh"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-date-picker
                  :allowClear="false"
                  v-model:value="filters22.repDob"
                  format="DD/MM/YYYY"
                  style="width: 100%"
                  placeholder="Ngày sinh"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc tịch"
                name="nationalityId"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Nơi cấp"
                  v-model:value="filters22.nationalityId"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Tên viết tắt"
                name="repShortName"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Tên viết tắt"
                  v-model:value="filters22.repShortName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Loại GTTT "
                name="identityType"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-select style="color: black" v-model:value="filters22.identityType">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Chứng minh nhân dân</a-select-option>
                <a-select-option :value="2" :key="2">Căn cước công dân</a-select-option>
                <a-select-option :value="3" :key="3">Hộ chiếu</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Số GTTT"
                name="identityNumber"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Số GTTT"
                  v-model:value="filters22.identityNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="repMobileNumber"
                style="margin-bottom: 8px"
                ::rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di dộng"
                  v-model:value="filters22.repMobileNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="repEmail"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email"
                  v-model:value="filters22.repEmail"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc gia"
                name="nationId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters22.nationId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="84" :key="84">Việt Nam</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Tỉnh/ Thành phố"
                name="provinceId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters22.provinceId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in province22"
                    :value="item?.provinceCode"
                    :key="item?.provinceCode">{{ item?.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quận/ Huyện"
                name="districtId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters22.districtId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in district22"
                    :value="item?.districtCode"
                    :key="item?.districtCode">{{ item?.districtName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Phường/ Xã"
                name="communeId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters22.communeId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in commune22"
                    :value="item?.communeCode"
                    :key="item?.communeCode">{{ item?.communeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Địa chỉ"
                name="fullAddress"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Số nhà, tên đường"
                  v-model:value="filters22.fullAddress"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <div style="display: flex;flex-direction: column; gap: 8px">
          <a-button
              v-if="!showFilters22"
              type="primary"
              @click="()=> { showFilters22 = true }"
              style="display: flex; justify-content: center;align-content: center; background-color: rgba(245, 154, 35, 1); width: 185px">
            <plus-outlined style="padding: 0;margin-top: 4px; margin-right: 2px"/>
            Thêm người đại diện
          </a-button>
          <a-button
              v-if="!showFilters23"
              type="primary"
              @click="()=> {  showFilters23 = true }"
              style="display: flex; justify-content: center;align-content: center; background-color: rgba(245, 154, 35, 1); width: 185px">
            <plus-outlined style="padding: 0;margin-top: 4px"/>
            Thêm người ủy quyền
          </a-button>
        </div>
      </a-card>
    </a-form>

    <a-form v-if="showFilters23" ref="ruleForm23" :model="filters23" layout="vertical">
      <a-card style="width: 100%;border: none">
        <div style="display: flex;flex-direction: row; justify-content: space-between; align-items: start">
          <p class="sub-title-register">Người ủy quyền</p>
          <a-button @click="()=>{ showFilters23 = false}">Xóa</a-button>
        </div>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Họ và tên"
                name="repFullName"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Họ và tên"
                  v-model:value="filters23.repFullName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Chức vụ"
                name="repPosition"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  v-model:value="filters23.repPosition">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Người liên hệ</a-select-option>
                <a-select-option :value="2" :key="2">Phó giám đốc</a-select-option>
                <a-select-option :value="3" :key="3">Kế toán trưởng</a-select-option>
                <a-select-option :value="4" :key="4">Kế toán viên</a-select-option>
                <a-select-option :value="5" :key="5">Phó chủ tịch</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                name="repDob"
                label="Ngày sinh"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-date-picker
                  :allowClear="false"
                  v-model:value="filters23.repDob"
                  format="DD/MM/YYYY"
                  style="width: 100%"
                  placeholder="Ngày sinh"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc tịch"
                name="nationalityId"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Nơi cấp"
                  v-model:value="filters23.nationalityId"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Tên viết tắt"
                name="repShortName"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Tên viết tắt"
                  v-model:value="filters23.repShortName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Loại GTTT "
                name="identityType"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-select style="color: black" v-model:value="filters23.identityType">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Chứng minh nhân dân</a-select-option>
                <a-select-option :value="2" :key="2">Căn cước công dân</a-select-option>
                <a-select-option :value="3" :key="3">Hộ chiếu</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Số GTTT"
                name="identityNumber"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Số GTTT"
                  v-model:value="filters23.identityNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="repMobileNumber"
                style="margin-bottom: 8px"
                ::rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di dộng"
                  v-model:value="filters23.repMobileNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="repEmail"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email"
                  v-model:value="filters23.repEmail"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc gia"
                name="nationId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters23.nationId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="84" :key="84">Việt Nam</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Tỉnh/ Thành phố"
                name="provinceId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters23.provinceId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in province23"
                    :value="item?.provinceCode"
                    :key="item?.provinceCode">{{ item?.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quận/ Huyện"
                name="districtId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters23.districtId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in district23"
                    :value="item?.districtCode"
                    :key="item?.districtCode">{{ item?.districtName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Phường/ Xã"
                name="communeId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters23.communeId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in commune23"
                    :value="item?.communeCode"
                    :key="item?.communeCode">{{ item?.communeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Địa chỉ"
                name="fullAddress"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Số nhà, tên đường"
                  v-model:value="filters23.fullAddress"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <div style="display: flex;justify-content: center;gap: 20px">
      <a-button
          @click="onClickButtonPre"
          style="width: 80px; border-radius: 2px">
        Quay lại
      </a-button>
      <a-button
          @click='onClickButtonNext'
          type="primary"
          style="background-color: rgba(245, 154, 35, 1); width: 80px">
        Tiếp tục
      </a-button>
    </div>
  </slot>
</template>

<script lang="ts">
import {
  PlusOutlined
} from '@ant-design/icons-vue';
import {$get, $post} from "@/lib/utils";
import {useRegisterStore} from "@/store/register";
import {mapActions, mapState} from "pinia";
import {Modal} from 'ant-design-vue';
import {
  SAVE_STATE_STEP1_REGISTER,
  SAVE_STATE_STEP2_REGISTER,
  SAVE_STATE_STEP3_REGISTER,
  SET_STEP_REGISTER,
  RESET_STATE_REGISTER
} from "@/store/actionTypes";
import {API_CODE} from "@/define";

export default {
  name: "Step2",
  components: {
    PlusOutlined
  },
  setup() {
    const registerStore = useRegisterStore()

    return {registerStore}
  },
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,

      province21: [],
      district21: [],
      commune21: [],
      // disableProvince: false,
      // disableDistrict: false,
      // disableCommune: false,
      filters21: {
        repFullName: "",
        repPosition: "",
        repDob: null,
        nationalityId: "",
        repShortName: "",
        identityType: null,
        identityNumber: "",
        repMobileNumber: "",
        repEmail: "",
        nationId: null,
        provinceId: null,
        districtId: null,
        communeId: null,
        fullAddress: "",
        repType: 1
      },

      showFilters22: false,
      province22: [],
      district22: [],
      commune22: [],
      filters22: {
        repFullName: "",
        repPosition: "",
        repDob: null,
        nationalityId: "",
        repShortName: "",
        identityType: null,
        identityNumber: "",
        repMobileNumber: "",
        repEmail: "",
        nationId: null,
        provinceId: null,
        districtId: null,
        communeId: null,
        fullAddress: "",
        repType: 1
      },

      showFilters23: false,
      province23: [],
      district23: [],
      commune23: [],
      filters23: {
        repFullName: "",
        repPosition: "",
        repDob: null,
        nationalityId: "",
        repShortName: "",
        identityType: null,
        identityNumber: "",
        repMobileNumber: "",
        repEmail: "",
        nationId: null,
        provinceId: null,
        districtId: null,
        communeId: null,
        fullAddress: "",
        repType: 2
      },
    }
  },
  created() {
  },
  computed: {
    ...mapState(useRegisterStore, {
      currentStep: 'currentStep',
      formStep21: 'formStep21',
      formStep22: 'formStep22',
      formStep23: 'formStep23'
    })
  },
  mounted() {
    this.mapInitState()
    this.onProvince()
    // this.searchCode()
  },
  methods: {
    ...mapActions(useRegisterStore, {
      SAVE_STATE_STEP1_REGISTER,
      SAVE_STATE_STEP2_REGISTER,
      SAVE_STATE_STEP3_REGISTER,
      SET_STEP_REGISTER,
    }),
    onClickButtonPre() {
      this.SET_STEP_REGISTER(1)
    },
    onValidateStep2() {
      return true
    },
    async onClickButtonNext() {
      let error: any = null;
      try {
        await this.$refs.ruleForm21.validate()
        if(this.showFilters22) {
          await this.$refs.ruleForm22.validate()
        }
        if(this.showFilters23) {
          await this.$refs.ruleForm23.validate()
        }
      } catch (e: any) {
        error = e;
        console.log('Error', e)
      }
      setTimeout(()=>{
        if (error === null && this.onValidateStep2()) {
          this.scrollToTop()
          this.SAVE_STATE_STEP2_REGISTER(this.filters21, this.showFilters22, this.filters23)
        }
      },200)
    },
    mapInitState() {
      //filters21
      this.filters21.repFullName = this.formStep21.repFullName
      this.filters21.repPosition = this.formStep21.repPosition
      this.filters21.repDob = this.formStep21.repDob
      this.filters21.nationalityId = this.formStep21.nationalityId
      this.filters21.repShortName = this.formStep21.repShortName
      this.filters21.identityType = this.formStep21.identityType
      this.filters21.identityNumber = this.formStep21.identityNumber
      this.filters21.repMobileNumber = this.formStep21.repMobileNumber
      this.filters21.repEmail = this.formStep21.repEmail
      this.filters21.nationId = this.formStep21.nationId
      this.filters21.provinceId = this.formStep21.provinceId
      this.filters21.districtId = this.formStep21.districtId
      this.filters21.communeId = this.formStep21.communeId
      this.filters21.fullAddress = this.formStep21.fullAddress
      this.filters21.repType = this.formStep21.repType
      //filters22
      this.filters22.repFullName = this.formStep22.repFullName
      this.filters22.repPosition = this.formStep22.repPosition
      this.filters22.repDob = this.formStep22.repDob
      this.filters22.nationalityId = this.formStep22.nationalityId
      this.filters22.repShortName = this.formStep22.repShortName
      this.filters22.identityType = this.formStep22.identityType
      this.filters22.identityNumber = this.formStep22.identityNumber
      this.filters22.repMobileNumber = this.formStep22.repMobileNumber
      this.filters22.repEmail = this.formStep22.repEmail
      this.filters22.nationId = this.formStep22.nationId
      this.filters22.provinceId = this.formStep22.provinceId
      this.filters22.districtId = this.formStep22.districtId
      this.filters22.communeId = this.formStep22.communeId
      this.filters22.fullAddress = this.formStep22.fullAddress
      this.filters22.repType = this.formStep22.repType
      //filters23
      this.filters23.repFullName = this.formStep23.repFullName
      this.filters23.repPosition = this.formStep23.repPosition
      this.filters23.repDob = this.formStep23.repDob
      this.filters23.nationalityId = this.formStep23.nationalityId
      this.filters23.repShortName = this.formStep23.repShortName
      this.filters23.identityType = this.formStep23.identityType
      this.filters23.identityNumber = this.formStep23.identityNumber
      this.filters23.repMobileNumber = this.formStep23.repMobileNumber
      this.filters23.repEmail = this.formStep23.repEmail
      this.filters23.nationId = this.formStep23.nationId
      this.filters23.provinceId = this.formStep23.provinceId
      this.filters23.districtId = this.formStep23.districtId
      this.filters23.communeId = this.formStep23.communeId
      this.filters23.fullAddress = this.formStep23.fullAddress
      this.filters23.repType = this.formStep23.repType
    },
    async onProvince() {
      try {
        const res = await $get('/ew-public/location/v1/province');
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          this.province21 = body
          this.province22 = body
          this.province23 = body
        } else {
          console.log(message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onDistrict(provinceCode: string | number, filtersName: string) {
      try {
        const res = await $get(`/ew-public/location/v1/district?provinceCode=${provinceCode}`);
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          if (filtersName === 'filters21') {
            this.district21 = body
          }
          if (filtersName === 'filters22') {
            this.district22 = body
          }
          if (filtersName === 'filters23') {
            this.district23 = body
          }
        } else {
          console.log(message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onCommune(districtCode: string | number, filtersName: string) {
      try {
        const res = await $get(`/ew-public/location/v1/commune?districtCode=${districtCode}`)
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          if (filtersName === 'filters21') {
            this.commune21 = body
          }
          if (filtersName === 'filters22') {
            this.commune22 = body
          }
          if (filtersName === 'filters23') {
            this.commune23 = body
          }
        } else {
          console.log(message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async searchCode() {
      try {
        const res = await $get('/ew-public/sys/global/list/v1/search-code');
        console.log('res', res)
      } catch (e) {
        console.log(e)
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  watch: {
    'filters21.nationId': function () {

    },
    'filters21.provinceId': function () {
      if (this.filters21.provinceId !== null) {
        this.district21 = []
        this.commune21 = []
        this.filters21.districtId = null
        this.filters21.communeId = null
        this.onDistrict(this.filters21.provinceId, 'filters21')
      }
    },
    'filters21.districtId': function () {
      if (this.filters21.districtId !== null) {
        this.commune21 = []
        this.filters21.communeId = null
        this.onCommune(this.filters21.districtId, 'filters21')
      }
    },
    'filters21.communeId': function () {

    },


    'filters22.nationId': function () {

    },
    'filters22.provinceId': function () {
      if (this.filters22.provinceId !== null) {
        this.district22 = []
        this.commune22 = []
        this.filters22.districtId = null
        this.filters22.communeId = null
        this.onDistrict(this.filters22.provinceId, 'filters22')
      }
    },
    'filters22.districtId': function () {
      if (this.filters22.districtId !== null) {
        this.commune22 = []
        this.filters22.communeId = null
        this.onCommune(this.filters22.districtId, 'filters22')
      }
    },
    'filters22.communeId': function () {

    },

    'filters23.nationId': function () {

    },
    'filters23.provinceId': function () {
      if (this.filters23.provinceId !== null) {
        this.district23 = []
        this.commune23 = []
        this.filters23.districtId = null
        this.filters23.communeId = null
        this.onDistrict(this.filters23.provinceId, 'filters23')
      }
    },
    'filters23.districtId': function () {
      if (this.filters23.districtId !== null) {
        this.commune23 = []
        this.filters23.communeId = null
        this.onCommune(this.filters23.districtId, 'filters23')
      }
    },
    'filters23.communeId': function () {

    },
  }
}
</script>


<style lang="scss" scoped>

@import "ant-design-vue/dist/reset.css";
@import "@/scss/register.scss";

.wrap-step {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center
}

.item-step {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: orange;
  border-radius: 17px
}

.line-item-step {
  display: flex;
  width: 100px;
  height: 1px;
  background-color: black;
  align-self: center;
  margin: 0 2px
}

.text-item-step {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0;
}

p {
  margin-bottom: 0;
}

.title-register {
  font-size: 24px;
  font-weight: bold;
}

.sub-title-register {
  font-size: 20px;
  font-weight: bold;
}

</style>
