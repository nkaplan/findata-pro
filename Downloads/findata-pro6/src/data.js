// 3-Year periods
export const YEARS = ['2022', '2023', '2024'];

// Auth users
export const USERS = {
  'demo@demo.com':         { pw: 'demo123',     name: 'Demo Kullanıcı',  org: 'Demo Banka',   plan: 'Professional' },
  'demo@garanti.com.tr':   { pw: 'Garanti2024!', name: 'Mehmet Yılmaz',   org: 'Garanti BBVA', plan: 'Enterprise' },
  'analyst@isbank.com.tr': { pw: 'IsBank2024!',  name: 'Ayşe Demir',      org: 'İş Bankası',   plan: 'Enterprise' },
  'risk@akbank.com.tr':    { pw: 'Akbank2024!',  name: 'Can Öztürk',      org: 'Akbank',       plan: 'Professional' },
};

const mk = (a, b, c) => ({ '2022': a, '2023': b, '2024': c });

export const createInitialData = () => ({
  bs_current: {
    'Nakit ve Nakit Benzerleri':        mk(269133125, 772057340, 758522905),
    'Finansal Yatırımlar (Kısa)':      mk(411351039, 0, 0),
    'Diğer Alacaklar':                 mk(508463, 307636, 316968),
    'Peşin Ödenmiş Giderler':          mk(7079, 0, 139421),
    'Diğer Dönen Varlıklar':           mk(0, 846805, 0),
    'Toplam Dönen Varlıklar':          mk(681513580, 773211781, 758979294),
  },
  bs_noncurrent: {
    'Finansal Yatırımlar (FVOCI)':     mk(4722614486, 5005630260, 6136313185),
    'Özkaynak Yönt. Değ. Yatırımlar':  mk(9768993044, 10890059897, 14046229158),
    'Kullanım Hakkı Varlıkları':       mk(111228, 72887, 54665),
    'Maddi Olmayan Duran Varlıklar':   mk(169987, 58066, 55329),
    'Diğer Duran Varlıklar':           mk(19533632, 14443754, 20071147),
    'Toplam Duran Varlıklar':          mk(14511532825, 15910299474, 20202723484),
  },
  bs_total: {
    'TOPLAM VARLIKLAR':                mk(15193046405, 16683511255, 20961702778),
  },
  bs_cl: {
    'Kısa Vadeli Borçlanmalar':        mk(22357, 20687, 26157),
    'Ticari Borçlar':                  mk(2252776, 2608815, 3153344),
    'Diğer Kısa Vadeli Yük.':          mk(417662, 480219, 580010),
    'İlişkili Taraflara Diğer Yük.':   mk(0, 101552037, 0),
    'Dönem Karı Vergi Yük.':           mk(0, 11360661, 3567232),
    'Kısa Vadeli Yük. Toplamı':        mk(2692795, 116022419, 7326743),
  },
  bs_ncl: {
    'Uzun Vadeli Borçlanmalar':        mk(98075, 66808, 46409),
    'Ertelenmiş Vergi Yük.':           mk(221929124, 200330934, 442125882),
    'Uzun Vadeli Yük. Toplamı':        mk(222027199, 200397742, 442172291),
  },
  bs_eq: {
    'Ödenmiş Sermaye':                 mk(105000000, 105000000, 105000000),
    'Sermaye Düzeltme Farkları':       mk(3234498687, 3234498687, 4716534809),
    'Birikmiş Diğer Kapsamlı Gelirler': mk(2023779082, 2699335843, 1011798572),
    'Kısıtlanmış Yedekler':            mk(287796487, 287796487, 260782138),
    'Geçmiş Yıl Karları':              mk(8263905865, 9011148854, 13938306900),
    'Net Dönem Karı':                  mk(1032577525, 973377784, 443539717),
    'Toplam Özkaynaklar':              mk(14968326411, 16367091094, 20512203744),
  },
  income: {
    'Genel Yönetim Giderleri':         mk(-24107981, -24756118, -31425143),
    'Esas Faal. Diğer Gelirler':       mk(455891686, 550158516, 525648337),
    'Esas Faal. Diğer Giderler':       mk(-66073671, -88416275, -15523060),
    'Esas Faaliyet Karı':              mk(365710034, 436986123, 478700134),
    'Özk. Yönt. Değ. Yat. Karları':   mk(1005186843, 895288271, 296168325),
    'Fin. Gid. Öncesi Faal. Karı':    mk(1370896877, 1332274394, 774868459),
    'Finansman Giderleri':             mk(-23674, -28942, -18214),
    'Parasal Kayıp':                   mk(-286982272, -323889969, -294361047),
    'Vergi Öncesi Kar':                mk(1083890931, 1008355483, 480489198),
    'Vergi Gideri':                    mk(-51313406, -34977699, -36949481),
    'Net Dönem Karı':                  mk(1032577525, 973377784, 443539717),
    'Pay Başına Kazanç (TL)':          mk(9.83, 9.27, 4.22),
  },
  cashflow: {
    'İşletme Faal. Nakit':             mk(-382933376, 530743223, 2506995),
    'Yatırım Faal. Nakit':             mk(158450037, 441803716, 591927179),
    'Finansman Faal. Nakit':           mk(-433231705, -285365801, -632038415),
    'Dönem Sonu Nakit':                mk(269104730, 771602486, 758128997),
  },
  comprehensive: {
    'Dönem Karı':                      mk(1032577525, 973377784, 443539717),
    'Diğer Kapsamlı Gelir':           mk(2044547847, 710721435, -2929990057),
    'Toplam Kapsamlı Gelir':           mk(3077125372, 1684099219, -2486450340),
  },
});

export const BOARD_MEMBERS = [
  { name: 'Ferit Bülent Eczacıbaşı', role: 'YK Başkanı' },
  { name: 'Rahmi Faruk Eczacıbaşı', role: 'YK Başkan Vekili' },
  { name: 'Ferit Erin', role: 'Genel Müdür' },
  { name: 'Simhan Savaşçın Başaran', role: 'Üye' },
  { name: 'Nesimi Erten', role: 'Bağımsız Üye' },
  { name: 'Sertaç Mustafa Nişli', role: 'Bağımsız Üye' },
];

export const COMPANY_INFO = [
  ['Unvan', 'Eczacıbaşı Yatırım Holding Ortaklığı A.Ş.'],
  ['Borsa', 'ECZYT | BIST'],
  ['ISIN', 'TRAECZYT91Q5'],
  ['LEI', '789000ECEDGNJ3ZHYG51'],
  ['Ülke', 'Türkiye'],
  ['Kuruluş', '29 Aralık 1973'],
  ['Adres', 'Kanyon Ofis, Büyükdere Cad. 185, Şişli/İstanbul'],
  ['Sermaye', '105.000.000 TL'],
  ['Kayıtlı Sermaye', '500.000.000 TL'],
  ['Halka Açıklık', '%18,33'],
];

export const FILINGS_INFO = [
  { period: 'FY 2024', auditor: 'Deloitte (DRT)', date: '11.03.2025', pages: 136, color: '#3b82f6' },
  { period: 'FY 2023', auditor: 'PwC', date: '17.04.2024', pages: 52, color: '#10b981' },
];
