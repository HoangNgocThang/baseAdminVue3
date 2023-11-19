<template>
  <div class="main-content app-content"> <!-- container -->
    <div class="main-container container-fluid"> <!-- breadcrumb -->
      <div class="breadcrumb-header justify-content-between">
        <!--                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">DASHBOARD</span></div>-->
        <div class="justify-content-center mt-2">
          <ol class="breadcrumb">
            <li class="breadcrumb-item tx-15"><a href="javascript:void(0);">TRANG CHỦ</a></li>
            <li class="breadcrumb-item tx-15 active" aria-current="page"> Quản lý tài khoản ví</li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12">
          <div  style="width: 95%">
            <a-card>
              <div style="display: flex;flex-direction: column">
                <p style="font-size: 28px; font-weight: bold;margin-bottom: 0">Công ty Dịch vụ số Bưu Điện</p>
                <p style="font-size: 16px; color: #0090DA; margin-bottom: 0; margin-top: 4px;cursor: pointer">Danh sách tài khoản ví</p>
              </div>
            </a-card>

            <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
              <p class="text-title-home">Thông tin tài khoản</p>
              <a-button>
                Cập nhật thông tin
              </a-button>
            </div>
            <a-card style="padding: 0 50px">
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Tên công ty:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Công ty Dịch vụ Số Bưu điện</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Tên viết tắt:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>VNPD</p>
                  </div>
                </div>
              </div>

              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Loại hình tổ chức:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Công ty vốn nhà nước</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Ngành kinh doanh:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Chuyển đổi số</p>
                  </div>
                </div>
              </div>

              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Mã số thuế:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>1234545677</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Ngày cấp:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>20/10/2011</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Nơi cấp:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Hà Nội</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Mã đăng ký kinh doanh:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>1234545677</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Ngày cấp:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>20/10/2011</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Nơi cấp:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Hà Nội</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Địa chỉ:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>5 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                </div>
              </div>

              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Điện thoại cố định:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>0123456788</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Số fax:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>0123456789</p>
                  </div>
                </div>
              </div>

              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Điện thoại di động:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>0123456789</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Email:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>vnpd@vnpost.vn</p>
                  </div>
                </div>
              </div>

              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Giấy ĐKKD:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p style="color: blue; text-decoration: underline;cursor: pointer">abc.pdf</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                </div>
              </div>

              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 210px">
                    <p class="text-label">Trạng thái giấy chứng thực:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p style="color: green">Đã xác thực</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                </div>
              </div>
            </a-card>

            <p class="text-title-home">Thông tin người đại diện 1</p>
            <a-card style="padding: 0 50px">
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Họ và tên:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Hoàng Thị A</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Chức vụ:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Giám đốc</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Ngày sinh:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>20/10/1988</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Quốc tịch:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Việt Nam</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Tên viết tắt:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Văn A</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Loại GTTT:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>CCCD</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Số GTTT:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>12334455677</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Điện thoại di động:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>0123234345</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Email:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>hoangthia@gmail.com</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Địa chỉ:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>5 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">

                </div>
              </div>
            </a-card>

            <p class="text-title-home">Người ủy quyền</p>
            <a-card style="padding: 0 50px">
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Họ và tên:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Hoàng Thị A</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Chức vụ:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Giám đốc</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Ngày sinh:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>20/10/1988</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Quốc tịch:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Việt Nam</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Tên viết tắt:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>Văn A</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">

                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Loại GTTT:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>CCCD</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Số GTTT:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>12334455677</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Điện thoại di động:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>0123234345</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Email:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>hoangthia@gmail.com</p>
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px">
                <div style="display: flex;flex: 1; flex-direction: row;">
                  <div style="width: 200px">
                    <p class="text-label">Địa chỉ:</p>
                  </div>
                  <div style="display: flex;flex: 1">
                    <p>5 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội</p>
                  </div>
                </div>
                <div style="display: flex;flex: 1; flex-direction: row;">

                </div>
              </div>
            </a-card>

            <div style="height: 30px">

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "AccountInfoView",
  components: {
    // ModalForm
  },
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,
    }
  },
  created() {
    // this.$router.push({ name: 'login', });
    // this.$router.push({ name: 'login', query: { redirect: '/login' } });
  },
  mounted() {

  },
  methods: {},
  watch: {}
}
</script>

<style scoped>

.text-title-home {
  font-size: 20px;
  margin-bottom: 4px;
  margin-top: 20px;
}

.text-label {
  font-size: 15px;
  font-weight: bold;
}

</style>
