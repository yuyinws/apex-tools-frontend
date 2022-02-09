export const baseMap = {
  battle_royale: '大逃杀',
  arenas: '竞技场',
  ranked: '排位大逃杀',
  arenasRanked: '排位竞技场',
  control: '控制',
  worlds_edge_rotation: '世界尽头',
  storm_point_rotation: '风暴点',
  barometer_rotation: '晴雨表',
  hammond_labs_rotation: '哈曼德实验室',
  olympus_rotation: '奥林匹斯',
  arenas_overflow: '再来一次',
  arenas_encore: '熔岩流',
  arenas_party_crasher: '派对破坏者',
  arenas_phase_runner: '相位穿梭器',
  arenas_habitat: '栖息地',
  Revenant: '亡灵',
  Crypto: '密客',
  Horizon: '地平线',
  Gibraltar: '直布罗陀',
  Wattson: '沃特森',
  Fuse: '暴雷',
  Bangalore: '班加罗尔',
  Wraith: '恶灵',
  Octane: '动力小子',
  Bloodhound: '寻血猎犬',
  Caustic: '侵蚀',
  Lifeline: '命脉',
  Pathfinder: '探路者',
  Loba: '罗芭',
  Mirage: '幻象',
  Rampart: '罗布特',
  Valkyrie: '瓦尔基里',
  Seer: '希尔',
  Ash: '艾什',
  Bronze: '青铜',
  Silver: '白银',
  Gold: '黄金',
  Platinum: '白金',
  Diamond: '钻石',
  Master: '大师',
  Apexpredator: '猎杀',
  Unranked: '无数据',
}

export const base = (name) => {
  return baseMap[name] || name
}

export const nameReplace = (name) => {
  name = name.toLowerCase()
  name = name.replace(/kills/, '击杀:')
  name = name.replace(/wins/, '胜利:')
  name = name.replace(/season/, '赛季')
  name = name.replace(/damage/, '伤害:')
  return name
}
