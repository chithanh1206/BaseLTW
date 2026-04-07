export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },

  {
    path: '/gioi-thieu',
    name: 'About',
    component: './TienIch/GioiThieu',
    hideInMenu: true,
  },

  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  {
    path: '/todo-list',
    name: 'TodoList',
    icon: 'OrderedListOutlined',
    component: './TodoList',
  },

  {
    path: '/products',
    name: 'Quản lý sản phẩm',
    icon: 'ShopOutlined',
    component: './DanhMuc/QuanLySanPham',
  },

{
  path: '/oan-tu-ti',
  name: 'Oẳn Tù Tì',
  component: './TH02/OanTuTi',
  icon: 'SmileOutlined',
},

{
  path: '/cau-hoi',
  name: 'Ngân hàng câu hỏi',
  component: './TH02/CauHoi',
  icon: 'DatabaseOutlined',
},

{
  path: '/mon-hoc',
  name: 'Quản lý môn học',
  component: './TH02/MonHoc',
  icon: 'BookOutlined',
},
{
  path: '/nhan-vien',
  name: 'Nhân viên',
  icon: 'UserOutlined',
  component: './QuanLyNhanVien/TrangNhanVien'
},
{
  path: '/dich-vu',
  name: 'Dịch vụ',
  icon: 'AppstoreOutlined',
  component: './QuanLyDichVu/TrangDichVu'
},
{
  path: '/lich-hen',
  name: 'Lịch hẹn',
  icon: 'CalendarOutlined',
  component: './QuanLyLichHen/TrangLichHen'
},
{
  path: '/danh-gia',
  name: 'Đánh giá',
  icon: 'StarOutlined',
  component: './QuanLyDanhGia/TrangDanhGia'
},
{
  path: '/thong-ke',
  name: 'Thống kê',
  icon: 'BarChartOutlined',
  component: './BaoCaoThongKe/TrangThongKe'
},

  {
    path: '/',
    redirect: '/sovanbang',
  },

  {
    path: '/sovanbang',
    name: 'SoVanBang',
    component: '@/pages/SoVanBang',
  },
  {
    path: '/quyetdinh',
    name: 'QuyetDinh',
    component: '@/pages/QuyetDinh',
  },
  {
    path: '/cauhinh',
    name: 'CauHinh',
    component: '@/pages/CauHinh',
  },
  {
    path: '/vanbang',
    name: 'VanBang',
    component: '@/pages/VanBang',
  },
  {
    path: '/tracuu',
    name: 'TraCuu',
    component: '@/pages/TraCuu',
  },
{
  path: "/clb",
  component: "./CauLacBo",
},
{
  path: "/don",
  component: "./DonDangKy",
},
{
  path: "/thanh-vien",
  component: "./ThanhVien",
},
{
  path: "/bao-cao",
  component: "./BaoCaoThongKe",
},
{
    path: '/notification',
    routes: [
      {
        path: './subscribe',
        exact: true,
        component: './ThongBao/Subscribe',
      },
      {
        path: './check',
        exact: true,
        component: './ThongBao/Check',
      },
      {
        path: './',
        exact: true,
        component: './ThongBao/NotifOneSignal',
      },
    ],
    layout: false,
    hideInMenu: true,
  },
  {
    path: '/403',
    component: './exception/403/403Page',
    layout: false,
  },

  {
    path: '/hold-on',
    component: './exception/DangCapNhat',
    layout: false,
  },
{
  path: '/travel/home',
  name: 'Travel Home',
  component: '@/pages/Travel/Home',
},
{
  path: '/travel/planner',
  name: 'Planner',
  component: '@/pages/Travel/Planner',
},
{
  path: '/travel/budget',
  name: 'Budget',
  component: '@/pages/Travel/Budget',
},
{
  path: '/travel/admin',
  name: 'Admin',
  component: '@/pages/Travel/Admin',
},
{
  component: './exception/404',
}
];