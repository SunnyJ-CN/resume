export type Link = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  role: string;
  period: string;
  summary: string;
  appStore?: string;
  stack: string[];
  highlights: string[];
};

const yearDiff = (from: string, to = new Date()) => {
  const start = new Date(from);
  let years = to.getFullYear() - start.getFullYear();
  const hasNotReachedAnniversary =
    to.getMonth() < start.getMonth() ||
    (to.getMonth() === start.getMonth() && to.getDate() < start.getDate());

  if (hasNotReachedAnniversary) {
    years -= 1;
  }

  return years;
};

const formatYears = (years: number) => `${years} 年+`;

export const profile = {
  name: "姬向阳",
  title: "iOS 开发工程师 / 移动开发组组长",
  location: "深圳",
  email: "jxy800q@hotmail.com",
  phone: "13012935141",
  // 微信浏览器外无法稳定直达单聊，先复制微信号再拉起微信。
  wechat: "sunnyj1993",
  github: "https://github.com/SunnyJ-CN",
  resumeSince: "2019-05-01",
  currentCompanySince: "2022-03-01",
};

export const computed = {
  totalExperience: formatYears(yearDiff(profile.resumeSince)),
  currentCompanyYears: formatYears(yearDiff(profile.currentCompanySince)),
};

export const contactLinks: Link[] = [
  { label: "发送邮件", href: `mailto:${profile.email}` },
  { label: "拨打电话", href: `tel:${profile.phone}` },
  { label: "GitHub", href: profile.github },
  { label: "复制微信并打开", href: "weixin://" },
];

export const skills = [
  "Swift",
  "Objective-C",
  "UIKit",
  "SwiftUI / WidgetKit",
  "Combine",
  "BLE / GATT",
  "WebRTC / 直播",
  "百度地图 SDK",
  "Realm",
  "Alamofire",
  "CocoaPods / SPM",
  "Fastlane",
  "SwiftLint",
  "Git / GitHub Actions",
];

export const strengths = [
  "长期负责复杂车联网 App 的需求评估、技术方案、开发、自测、联调、上架与线上问题跟进。",
  "熟悉车辆定位、轨迹、电子围栏、记录仪直播、车机互联、BLE 指令链路等软硬件结合场景。",
  "偏好清晰、健壮、可读的 Swift 代码，重视模块边界、路由解耦、状态同步与调试可观测性。",
  "具备英语技术文档阅读能力，能在 SDK 升级、系统适配和第三方服务接入中快速定位问题。",
];

export const projects: Project[] = [
  {
    name: "兜风 App",
    role: "iOS 研发工程师 / 移动开发组组长",
    period: "2022.03 至今",
    summary:
      "车联网服务 App，覆盖车辆定位、行程轨迹、电子围栏、记录仪/360 直播、社区、商城、会员与福利体系等核心业务。",
    appStore:
      "https://apps.apple.com/cn/app/%E5%85%9C%E9%A3%8E-%E5%8F%91%E7%8E%B0%E8%87%AA%E7%94%B1%E7%94%9F%E6%B4%BB/id1625608217",
    stack: [
      "Swift",
      "UIKit",
      "WidgetKit",
      "Combine",
      "WebRTC",
      "百度地图",
      "Realm",
      "Alamofire",
      "友盟 / Bugly",
    ],
    highlights: [
      "负责核心业务从需求评估、技术路线、架构设计、开发联调、测试跟进到 App Store 上架的完整交付链路。",
      "建设 URL Scheme / Universal Link / 内部路由体系，支撑首页、轨迹、商城、福利、支付宝小程序等多入口跳转，并持续修复异常参数与基础 Tab 路由失效问题。",
      "落地 WidgetKit 小组件体系，包含快捷入口、驾驶数据、福利任务等场景，处理 Token 自动刷新、UserDefaults 数据合并、登录/绑定状态防御与低版本 iOS 布局兼容。",
      "接入 LocalSendKit 与车机文件互传能力，补齐热点扫码连接、传输状态上报、网络环境变化重建和测试环境日志页，提升偶发问题定位效率。",
      "重构记录仪/远程监控直播逻辑，拆分播放器策略，补充生命周期监听、推流失败处理、全屏状态恢复和日志链路，增强复杂直播场景稳定性。",
      "推进 D3D 车模与主题商城能力，完成素材下载解压、车牌生成、车模状态同步、SDK 日志接入 OSLog、资源体积优化和后台渲染暂停等工程优化。",
      "优化商业化与增长相关链路，包括开屏广告缓存策略、倒计时体验、信息流广告、激励广告回调、广告 SDK 切换和埋点上报。",
      "项目多端全渠道下载量 50W+，服务数十万用户，日活近 10W。",
    ],
  },
  {
    name: "CarMate Pro",
    role: "iOS 研发工程师",
    period: "2022.11 - 2023.12，后续持续维护",
    summary:
      "面向海外用户的车载设备互联 App，支持远程记录仪、轨迹、围栏、商城、社区及多语言本地化。",
    appStore: "https://apps.apple.com/cn/app/carmate-pro/id1453495738",
    stack: [
      "Swift",
      "Objective-C",
      "Flutter 混合开发",
      "UIKit",
      "Realm",
      "Firebase",
      "多语言本地化",
    ],
    highlights: [
      "负责海外版本迭代、Objective-C 到 Swift 的功能重构、多语言本地化与 iOS 版本适配。",
      "维护原生与 Flutter 混合工程，处理车辆轨迹、电子围栏、记录仪远程拍照、云盘文件浏览下载等关键链路。",
      "围绕海外版本接入广告、用户设备信息上报、轨迹 GPS 开关、时区兼容与潜在内存泄露修复，提升产品稳定性。",
    ],
  },
  {
    name: "InnoGate",
    role: "iOS 研发工程师",
    period: "2024.06 - 2024.10",
    summary:
      "BLE 设备连接与控制 App，重点处理低功耗蓝牙通信、指令配对、OTA 与数据安全。",
    appStore: "https://apps.apple.com/gb/app/innogate/id6740220042",
    stack: ["Swift", "UIKit", "CoreBluetooth", "BLE / GATT", "AES", "CRC", "OTA"],
    highlights: [
      "负责项目架构设计、技术选型、BLE 模块及页面功能开发，并参与蓝牙协议制订。",
      "实现设备搜索、连接、指令发送、特征值监听、Req/Resp 配对、超时处理、OTA 升级与主题资源加载。",
      "设计蓝牙指令异步串行队列，结合 AES 加密、CRC 校验和图片转 BMP 编码，保障通信链路可控可靠。",
      "引入 WebView 预加载与池化复用，减少重复创建带来的性能损耗，并修复 URL 中文处理与主题加载问题。",
    ],
  },
];

export const experiences = [
  {
    company: "深圳驾控科技有限公司",
    role: "iOS 开发工程师 / 移动开发组组长",
    period: "2022.03 至今",
    points: [
      "负责兜风 App 与海外 CarMate 的核心功能迭代、架构治理、系统适配、第三方 SDK 接入和 App Store 上架。",
      "组织组内技术讨论，推动路由、网络 API、支付、直播、Widget、车机互联等模块持续演进。",
    ],
  },
  {
    company: "济宁同心科技有限公司",
    role: "移动开发",
    period: "2019.05 - 2022.01",
    points: [
      "参与线上商城项目开发、测试与上线，负责 iOS 客户端即时通讯、商品评论页和服务端接口等工作。",
      "参与山东省政府采购政采云对接服务，以及配套电商商品采集助手开发。",
    ],
  },
];

export const education = {
  school: "四川师范大学",
  degree: "本科 / 软件工程",
  period: "2012 - 2017",
};
