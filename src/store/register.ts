import {defineStore} from 'pinia'
import {
    RESET_STATE_REGISTER,
    SAVE_STATE_STEP1_REGISTER,
    SAVE_STATE_STEP2_REGISTER,
    SAVE_STATE_STEP3_REGISTER,
    SET_STEP_REGISTER
} from "@/store/actionTypes";

export const useRegisterStore = defineStore('registerStore', {
    state: () => ({
        currentStep: 1,

        formStep1: {
            taxCodeParent: '', // Mã số thuế cha
            orgFullName: '', // Tên tổ chức
            orgShortName: '',// Tên viết tắt
            orgType: null,// Đối tượng
            orgField: null,//Lĩnh vực
            description: "", // Mô tả
            taxCode: "", // Mã số thuế
            effectiveDateTax: "", //Ngày cấp
            placeTax: "", // Nơi cấp

            businessCode: "", // Mã số ĐKKD
            effectiveDateBusiness: '', // Ngày cấp SĐKKD
            placeBusiness: '', // Nơi cấp SĐKKD

            nationId: null, // Quốc gia
            provinceId: null, // Tỉnh/Thành phố
            districtId: null, // Quận/Huyện
            communeId: null, // Phường/Xã
            fullAddress: "", // Địa chỉ
            orgLandlineNumber: "", // Điện thoại cố định
            fax: "", // Fax
            orgMobileNumber: "", // Điện thoại di động
            orgEmail: "", // Email
            totalEmployees: null, // Số lượng nhân viên
            charterCapital: "", // Vốn điều lệ
        },

        formStep21: {
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
            repType: 1 // Người đại diện -1 /Người ủy quyền - 2
        },

        formStep22: {
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
            repType: 1 // Người đại diện -1 /Người ủy quyền - 2
        },

        formStep23: {
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
            repType: 2// Người đại diện -1 /Người ủy quyền - 2
        },

        formStep31: {
            userLevel: 1, //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
            userFullName: "",
            userMobileNumber: "",
            userEmail: ""
        },
        formStep32: {
            userLevel: 2, // 1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
            userFullName: "",
            userMobileNumber: "",
            userEmail: ""
        },
        formStep33: {
            userLevel: 3, //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
            userFullName: "",
            userMobileNumber: "",
            userEmail: ""
        }
    }),
    getters: {},
    actions: {
        [SAVE_STATE_STEP1_REGISTER](data: any) {
            this.currentStep = 2
            this.formStep1.taxCodeParent = data?.taxCodeParent // Đơn vị trực thuộc
            this.formStep1.orgFullName = data?.orgFullName // Tên tổ chức
            this.formStep1.orgShortName = data?.orgShortName// Tên viết tắt
            this.formStep1.orgType = data?.orgType// Đối tượng
            this.formStep1.orgField = data?.orgField// Lĩnh vực
            this.formStep1.description = data?.description// Mô tả
            this.formStep1.taxCode = data?.taxCode// Mã số thuế
            this.formStep1.effectiveDateTax = data?.effectiveDateTax //Ngày cấp
            this.formStep1.placeTax = data?.placeTax// Nơi cấp

            this.formStep1.businessCode = data?.businessCode // Số đăng ký kinh doanh
            this.formStep1.effectiveDateBusiness = data?.effectiveDateBusiness || '' // Ngày cấp SĐKKD
            this.formStep1.placeBusiness = data?.placeBusiness // Nơi cấp SĐKKD

            this.formStep1.nationId = data?.nationId // Quốc gia
            this.formStep1.provinceId = data?.provinceId // Tỉnh/Thành phố
            this.formStep1.districtId = data?.districtId // Quận/Huyện
            this.formStep1.communeId = data?.communeId // Phường/Xã
            this.formStep1.fullAddress = data?.fullAddress // Địa chỉ
            this.formStep1.orgLandlineNumber = data?.orgLandlineNumber // Điện thoại cố định
            this.formStep1.fax = data?.fax// Fax
            this.formStep1.orgMobileNumber = data?.orgMobileNumber // Điện thoại di động
            this.formStep1.orgEmail = data?.orgEmail// Email
            this.formStep1.totalEmployees = data?.totalEmployees // Số lượng nhân viên
            this.formStep1.charterCapital = data?.charterCapital// Vốn điều lệ
        },
        [SAVE_STATE_STEP2_REGISTER](filters21: any, filters22: any, filters23: any) {
            this.currentStep = 3

            if (filters21) {
                this.formStep21.repFullName = filters21.repFullName
                this.formStep21.repPosition = filters21.repPosition
                this.formStep21.repDob = filters21.repDob
                this.formStep21.nationalityId = filters21.nationalityId
                this.formStep21.repShortName = filters21.repShortName
                this.formStep21.identityType = filters21.identityType
                this.formStep21.identityNumber = filters21.identityNumber
                this.formStep21.repMobileNumber = filters21.repMobileNumber
                this.formStep21.repEmail = filters21.repEmail
                this.formStep21.nationId = filters21.nationId
                this.formStep21.provinceId = filters21.provinceId
                this.formStep21.districtId = filters21.districtId
                this.formStep21.communeId = filters21.communeId
                this.formStep21.fullAddress = filters21.fullAddress
                this.formStep21.repType = filters21.repType
            }

            if (filters22) {
                this.formStep22.repFullName = filters22.repFullName
                this.formStep22.repPosition = filters22.repPosition
                this.formStep22.repDob = filters22.repDob
                this.formStep22.nationalityId = filters22.nationalityId
                this.formStep22.repShortName = filters22.repShortName
                this.formStep22.identityType = filters22.identityType
                this.formStep22.identityNumber = filters22.identityNumber
                this.formStep22.repMobileNumber = filters22.repMobileNumber
                this.formStep22.repEmail = filters22.repEmail
                this.formStep22.nationId = filters22.nationId
                this.formStep22.provinceId = filters22.provinceId
                this.formStep22.districtId = filters22.districtId
                this.formStep22.communeId = filters22.communeId
                this.formStep22.fullAddress = filters22.fullAddress
                this.formStep22.repType = filters22.repType
            }

            if (filters23) {
                this.formStep23.repFullName = filters23.repFullName
                this.formStep23.repPosition = filters23.repPosition
                this.formStep23.repDob = filters23.repDob
                this.formStep23.nationalityId = filters23.nationalityId
                this.formStep23.repShortName = filters23.repShortName
                this.formStep23.identityType = filters23.identityType
                this.formStep23.identityNumber = filters23.identityNumber
                this.formStep23.repMobileNumber = filters23.repMobileNumber
                this.formStep23.repEmail = filters23.repEmail
                this.formStep23.nationId = filters23.nationId
                this.formStep23.provinceId = filters23.provinceId
                this.formStep23.districtId = filters23.districtId
                this.formStep23.communeId = filters23.communeId
                this.formStep23.fullAddress = filters23.fullAddress
                this.formStep23.repType = filters23.repType
            }

        },
        [SAVE_STATE_STEP3_REGISTER](data: any) {
            this.currentStep = 4

            this.formStep31.userLevel = data.userLevel31 //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
            this.formStep31.userFullName = data.userFullName31
            this.formStep31.userMobileNumber = data.userMobileNumber31
            this.formStep31.userEmail = data.userEmail31

            this.formStep32.userLevel = data.userLevel32// 1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
            this.formStep32.userFullName = data.userFullName32
            this.formStep32.userMobileNumber = data.userMobileNumber32
            this.formStep32.userEmail = data.userEmail32

            this.formStep33.userLevel = data.userLevel33//1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
            this.formStep33.userFullName = data.userFullName33
            this.formStep33.userMobileNumber = data.userMobileNumber33
            this.formStep33.userEmail = data.userEmail33

        },
        [SET_STEP_REGISTER](step: number) {
            this.currentStep = step
        },
        [RESET_STATE_REGISTER]() {

        }
    },
})