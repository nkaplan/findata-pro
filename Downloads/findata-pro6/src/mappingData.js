// ═══════════════════════════════════════════════════════════════
//  BDR → TMS/VUK MAPPING KURAL TABLOSU
//  Excel BDR Sheet'inden çıkarılmış eşleştirme kuralları
// ═══════════════════════════════════════════════════════════════

export const BDR_SECTIONS = {
  DONEN: 'Dönen Varlıklar',
  DURAN: 'Duran Varlıklar',
  KV_YUK: 'Kısa Vadeli Yükümlülükler',
  UV_YUK: 'Uzun Vadeli Yükümlülükler',
  OZKAYNAK: 'Özkaynaklar',
  GELIR: 'Gelir Tablosu',
};

// Her satır: { bdrCode, bdrName, tmsCode, tmsNote, section, isNegative }
// isNegative: (-) ile biten kalemler pozitif girilir ama negatif etki yapar
export const MAPPING_RULES = [
  // ─── 1. DÖNEN VARLIKLAR ───
  // 10 - Nakit ve Nakit Benzerleri
  { bdrCode:'100', bdrName:'Kasa', tmsCode:'100', section:'DONEN' },
  { bdrCode:'101', bdrName:'Alınan Çekler', tmsCode:'101', section:'DONEN' },
  { bdrCode:'102', bdrName:'Bankalar', tmsCode:'102', section:'DONEN' },
  { bdrCode:'103', bdrName:'Verilen Çekler ve Ödeme Emirleri (-)', tmsCode:'103', section:'DONEN', isNegative:true },
  { bdrCode:'104', bdrName:'Banka Mevduatı Limit Kullanımları (-)', tmsCode:'300', section:'DONEN', isNegative:true, tmsNote:'KV mali borçlara aktarılır' },
  { bdrCode:'105', bdrName:'Kredi Kartıyla Yapılan Satışlardan Nakit Benzeri Alacaklar', tmsCode:'108', section:'DONEN' },
  { bdrCode:'106', bdrName:'Nakit Benzeri Menkul Kıymetler', tmsCode:'118', section:'DONEN' },
  { bdrCode:'107', bdrName:'Nakit Benzeri Diğer Varlıklar', tmsCode:'108', section:'DONEN' },
  { bdrCode:'108', bdrName:'Diğer Hazır Değerler', tmsCode:'108', section:'DONEN' },
  { bdrCode:'109', bdrName:'Nakit ve Nakit Benzerleri Değer Düşüklüğü Karşılığı (-)', tmsCode:'119', section:'DONEN', isNegative:true },
  // 11 - Finansal Yatırımlar (KV)
  { bdrCode:'110', bdrName:'GUD Farkı K/Z Yansıtılan Fin. Yatırımlar', tmsCode:'110-118', section:'DONEN' },
  { bdrCode:'111', bdrName:'GUD Farkı DKG Yansıtılan Fin. Yatırımlar', tmsCode:'110-118', section:'DONEN' },
  { bdrCode:'112', bdrName:'İtfa Edilmiş Maliyetle Ölçülen Fin. Yatırımlar', tmsCode:'110-118', section:'DONEN' },
  { bdrCode:'113', bdrName:'Maliyetle Ölçülen Fin. Yatırımlar', tmsCode:'110-118', section:'DONEN' },
  { bdrCode:'114', bdrName:'Teminata Verilen Fin. Yatırımlar', tmsCode:'110-118', section:'DONEN' },
  { bdrCode:'115', bdrName:'Bankalardaki Vadeli Mevduat', tmsCode:'102', section:'DONEN' },
  { bdrCode:'116', bdrName:'Kullanımı Kısıtlı Banka Bakiyeleri', tmsCode:'198', section:'DONEN' },
  { bdrCode:'117', bdrName:'Diğer Finansal Yatırımlar', tmsCode:'118', section:'DONEN' },
  { bdrCode:'118', bdrName:'Finansal Yatırımlar Değer Düşüklüğü Karşılıkları (-)', tmsCode:'119', section:'DONEN', isNegative:true },
  { bdrCode:'119', bdrName:'Türev Araçlar', tmsCode:'136', section:'DONEN' },
  // 12 - Ticari Alacaklar
  { bdrCode:'120', bdrName:'Alıcılar', tmsCode:'120', section:'DONEN' },
  { bdrCode:'121', bdrName:'Alacak Senetleri', tmsCode:'121', section:'DONEN' },
  { bdrCode:'122', bdrName:'Alınan İleri Tarihli Çekler', tmsCode:'101', section:'DONEN' },
  { bdrCode:'123', bdrName:'Kredi Kartıyla Yapılan Satışlardan Alacaklar', tmsCode:'127', section:'DONEN' },
  { bdrCode:'125', bdrName:'Diğer Ticari Alacaklar', tmsCode:'127', section:'DONEN' },
  { bdrCode:'126', bdrName:'İlişkili Taraflardan Ticari Alacaklar', tmsCode:'127', section:'DONEN' },
  { bdrCode:'127', bdrName:'Şüpheli Ticari Alacaklar', tmsCode:'128', section:'DONEN' },
  { bdrCode:'128', bdrName:'Ertelenmiş Vade Farkı Gelirleri (-)', tmsCode:'122', section:'DONEN', isNegative:true },
  { bdrCode:'129', bdrName:'Ticari Alacaklar Değer Düşüklüğü Karşılıkları (-)', tmsCode:'129', section:'DONEN', isNegative:true },
  // 13 - Diğer Alacaklar
  { bdrCode:'131', bdrName:'Ortaklardan Alacaklar', tmsCode:'131', section:'DONEN' },
  { bdrCode:'132', bdrName:'Ortaklıklardan Alacaklar', tmsCode:'132-133', section:'DONEN' },
  { bdrCode:'133', bdrName:'Diğer İlişkili Taraflardan Alacaklar', tmsCode:'132-133', section:'DONEN' },
  { bdrCode:'134', bdrName:'Verilen Depozito ve Teminatlar', tmsCode:'126', section:'DONEN' },
  { bdrCode:'135', bdrName:'Personelden Alacaklar', tmsCode:'135', section:'DONEN' },
  { bdrCode:'136', bdrName:'Diğer Çeşitli Alacaklar', tmsCode:'136', section:'DONEN' },
  { bdrCode:'137', bdrName:'Şüpheli Diğer Alacaklar', tmsCode:'138', section:'DONEN' },
  { bdrCode:'138', bdrName:'Ertelenmiş Vade Farkı Gelirleri (-)', tmsCode:'137', section:'DONEN', isNegative:true },
  { bdrCode:'139', bdrName:'Diğer Alacaklar Değer Düşüklüğü Karşılıkları (-)', tmsCode:'139', section:'DONEN', isNegative:true },
  // Sözleşme Varlıkları
  { bdrCode:'140', bdrName:'Devam Eden İnşa Sözleşmelerinden Varlıklar', tmsCode:'(-600)', section:'DONEN', tmsNote:'Özel hesap: devam eden inşaat' },
  { bdrCode:'141', bdrName:'Devam Eden Proje/Hizmet Sözleşmelerinden Varlıklar', tmsCode:'(-600)', section:'DONEN' },
  { bdrCode:'142', bdrName:'İmtiyazlı Sözleşmelere İlişkin Finansal Varlıklar', tmsCode:'136', section:'DONEN' },
  // 15 - Stoklar
  { bdrCode:'150', bdrName:'İlk Madde ve Malzeme', tmsCode:'150', section:'DONEN' },
  { bdrCode:'151', bdrName:'Yarı Mamuller', tmsCode:'151', section:'DONEN' },
  { bdrCode:'152', bdrName:'Mamuller', tmsCode:'152', section:'DONEN' },
  { bdrCode:'153', bdrName:'Ticari Mallar', tmsCode:'153', section:'DONEN' },
  { bdrCode:'154', bdrName:'Tamamlanmamış Hizmet Maliyetleri', tmsCode:'151', section:'DONEN' },
  { bdrCode:'155', bdrName:'Tamamlanmış Hizmet Maliyetleri', tmsCode:'153', section:'DONEN' },
  { bdrCode:'156', bdrName:'Yoldaki Stoklar', tmsCode:'159', section:'DONEN' },
  { bdrCode:'157', bdrName:'Diğer Stoklar', tmsCode:'157', section:'DONEN', tmsNote:'İçeriğe göre 236 olabilir' },
  { bdrCode:'158', bdrName:'Stok Değer Düşüklüğü Karşılıkları (-)', tmsCode:'158', section:'DONEN', isNegative:true },
  { bdrCode:'159', bdrName:'Verilen Sipariş Avansları', tmsCode:'159', section:'DONEN' },
  // Canlı Varlıklar (KV)
  { bdrCode:'170', bdrName:'Tarla Bitkileri', tmsCode:'153', section:'DONEN' },
  { bdrCode:'171', bdrName:'Bahçe Bitkileri', tmsCode:'153', section:'DONEN' },
  { bdrCode:'172', bdrName:'Büyükbaş Hayvanlar', tmsCode:'153', section:'DONEN' },
  { bdrCode:'173', bdrName:'Küçükbaş Hayvanlar', tmsCode:'153', section:'DONEN' },
  { bdrCode:'174', bdrName:'Kanatlı Hayvanlar', tmsCode:'153', section:'DONEN' },
  { bdrCode:'175', bdrName:'Su Canlıları ve Diğer', tmsCode:'153', section:'DONEN' },
  { bdrCode:'177', bdrName:'Canlı Varlıklar Değer Düşüklüğü Karşılıkları (-)', tmsCode:'158', section:'DONEN', isNegative:true },
  // 18 - Peşin Ödenmiş Giderler
  { bdrCode:'180', bdrName:'Peşin Ödenmiş Giderler', tmsCode:'180', section:'DONEN' },
  { bdrCode:'181', bdrName:'Gelir Tahakkukları', tmsCode:'181', section:'DONEN' },
  // 19 - Diğer Dönen Varlıklar
  { bdrCode:'190', bdrName:'Devreden KDV', tmsCode:'190', section:'DONEN' },
  { bdrCode:'191', bdrName:'İndirilecek KDV', tmsCode:'191', section:'DONEN' },
  { bdrCode:'192', bdrName:'Diğer KDV', tmsCode:'192', section:'DONEN' },
  { bdrCode:'193', bdrName:'Peşin Ödenen Vergi ve Fonlar', tmsCode:'193', section:'DONEN' },
  { bdrCode:'194', bdrName:'Verilen İş ve Personel Avansları', tmsCode:'194-195', section:'DONEN' },
  { bdrCode:'195', bdrName:'Diğer Çeşitli Dönen Varlıklar', tmsCode:'198', section:'DONEN' },
  { bdrCode:'196', bdrName:'Satış Amaçlı Elde Tutulan Duran Varlıklar', tmsCode:'256', section:'DONEN' },
  { bdrCode:'197', bdrName:'Satış Amaçlı Gruplara İlişkin Varlıklar', tmsCode:'256', section:'DONEN' },
  { bdrCode:'198', bdrName:'Ortaklara Dağıtım Amaçlı Varlıklar', tmsCode:'563', section:'DONEN' },
  { bdrCode:'199', bdrName:'Durdurulan Faaliyetlere İlişkin Varlıklar', tmsCode:'256', section:'DONEN' },

  // ─── 2. DURAN VARLIKLAR ───
  // 20 - Finansal Yatırımlar (UV)
  { bdrCode:'200', bdrName:'GUD Farkı K/Z Yansıtılan Fin. Yatırımlar (UV)', tmsCode:'240-248', section:'DURAN' },
  { bdrCode:'201', bdrName:'GUD Farkı DKG Yansıtılan Fin. Yatırımlar (UV)', tmsCode:'240-248', section:'DURAN' },
  { bdrCode:'202', bdrName:'İtfa Edilmiş Maliyetle Ölçülen Fin. Yatırımlar (UV)', tmsCode:'240-248', section:'DURAN' },
  { bdrCode:'203', bdrName:'Maliyetle Ölçülen Fin. Yatırımlar (UV)', tmsCode:'240-248', section:'DURAN' },
  { bdrCode:'204', bdrName:'Teminata Verilen Fin. Yatırımlar (UV)', tmsCode:'240-248', section:'DURAN' },
  { bdrCode:'205', bdrName:'Bankalardaki Vadeli Mevduat (UV)', tmsCode:'102', section:'DURAN' },
  { bdrCode:'206', bdrName:'Kullanımı Kısıtlı Banka Bakiyeleri (UV)', tmsCode:'236', section:'DURAN' },
  { bdrCode:'207', bdrName:'Diğer Finansal Yatırımlar (UV)', tmsCode:'248', section:'DURAN' },
  { bdrCode:'208', bdrName:'Finansal Yatırımlar Değer Düşüklüğü Karşılıkları (UV) (-)', tmsCode:'241', section:'DURAN', isNegative:true },
  { bdrCode:'209', bdrName:'Türev Araçlar (UV)', tmsCode:'236', section:'DURAN' },
  // Özkaynak Yöntemiyle Değerlenen Yatırımlar
  { bdrCode:'210', bdrName:'İştiraklerdeki Yatırımlar', tmsCode:'242', section:'DURAN' },
  { bdrCode:'211', bdrName:'İş Ortaklıklarındaki Yatırımlar', tmsCode:'242', section:'DURAN' },
  { bdrCode:'212', bdrName:'Bağlı Ortaklıklardaki Yatırımlar', tmsCode:'245', section:'DURAN' },
  { bdrCode:'218', bdrName:'Ortaklıklardaki Yat. Sermaye Taahhütleri (-)', tmsCode:'243-246', section:'DURAN', isNegative:true },
  { bdrCode:'219', bdrName:'Ortaklıklardaki Yat. Değer Düşüklüğü Karşılıkları (-)', tmsCode:'244-247', section:'DURAN', isNegative:true },
  // Ticari Alacaklar (UV)
  { bdrCode:'220', bdrName:'Alıcılar (UV)', tmsCode:'220', section:'DURAN' },
  { bdrCode:'221', bdrName:'Alacak Senetleri (UV)', tmsCode:'221', section:'DURAN' },
  { bdrCode:'222', bdrName:'Alınan İleri Tarihli Çekler (UV)', tmsCode:'221', section:'DURAN' },
  { bdrCode:'225', bdrName:'Diğer Ticari Alacaklar (UV)', tmsCode:'227', section:'DURAN' },
  { bdrCode:'226', bdrName:'İlişkili Taraflardan Ticari Alacaklar (UV)', tmsCode:'227', section:'DURAN' },
  { bdrCode:'229', bdrName:'Ticari Alacaklar Değer Düşüklüğü Karşılıkları (UV) (-)', tmsCode:'222-229', section:'DURAN', isNegative:true },
  // Diğer Alacaklar (UV)
  { bdrCode:'231', bdrName:'Ortaklardan Alacaklar (UV)', tmsCode:'231', section:'DURAN' },
  { bdrCode:'232', bdrName:'Ortaklıklardan Alacaklar (UV)', tmsCode:'232-233', section:'DURAN' },
  { bdrCode:'234', bdrName:'Verilen Depozito ve Teminatlar (UV)', tmsCode:'226', section:'DURAN' },
  { bdrCode:'236', bdrName:'Diğer Çeşitli Alacaklar (UV)', tmsCode:'236', section:'DURAN' },
  // Yatırım Amaçlı Gayrimenkuller
  { bdrCode:'245', bdrName:'GUD ile Ölçülen Yatırım Amaçlı Gayrimenkuller', tmsCode:'256', section:'DURAN' },
  { bdrCode:'246', bdrName:'Maliyetle Ölçülen Yatırım Amaçlı Gayrimenkuller', tmsCode:'256', section:'DURAN' },
  { bdrCode:'247', bdrName:'Yatırım Amaçlı Gayrimenkul Değer Düşüklüğü (-)', tmsCode:'257', section:'DURAN', isNegative:true },
  { bdrCode:'248', bdrName:'Birikmiş Amortismanlar (YAG) (-)', tmsCode:'257', section:'DURAN', isNegative:true },
  // Maddi Duran Varlıklar
  { bdrCode:'250', bdrName:'Arazi ve Arsalar', tmsCode:'250', section:'DURAN' },
  { bdrCode:'251', bdrName:'Yer Altı ve Yer Üstü Düzenleri', tmsCode:'251', section:'DURAN' },
  { bdrCode:'252', bdrName:'Binalar', tmsCode:'252', section:'DURAN' },
  { bdrCode:'253', bdrName:'Tesis, Makine ve Cihazlar', tmsCode:'253', section:'DURAN' },
  { bdrCode:'254', bdrName:'Taşıtlar', tmsCode:'254', section:'DURAN' },
  { bdrCode:'255', bdrName:'Demirbaşlar', tmsCode:'255', section:'DURAN' },
  { bdrCode:'256', bdrName:'Yapılmakta Olan Yatırımlar ve Diğer MDV', tmsCode:'256-258', section:'DURAN' },
  { bdrCode:'257', bdrName:'MDV Değer Düşüklüğü Karşılıkları (-)', tmsCode:'257', section:'DURAN', isNegative:true },
  { bdrCode:'258', bdrName:'Birikmiş Amortismanlar (MDV) (-)', tmsCode:'257', section:'DURAN', isNegative:true },
  { bdrCode:'259', bdrName:'Verilen Avanslar (MDV)', tmsCode:'259', section:'DURAN' },
  // Maddi Olmayan Duran Varlıklar
  { bdrCode:'260', bdrName:'Şerefiye', tmsCode:'261', section:'DURAN' },
  { bdrCode:'261', bdrName:'Haklar', tmsCode:'260', section:'DURAN' },
  { bdrCode:'262', bdrName:'İşletme Dışından Elde Edilmiş Diğer MODV', tmsCode:'267', section:'DURAN' },
  { bdrCode:'263', bdrName:'İşletme İçinde Oluşturulmuş MODV', tmsCode:'267', section:'DURAN' },
  { bdrCode:'264', bdrName:'Araştırma ve Geliştirme Giderleri', tmsCode:'263', section:'DURAN' },
  { bdrCode:'266', bdrName:'Diğer Maddi Olmayan Duran Varlıklar', tmsCode:'267', section:'DURAN' },
  { bdrCode:'267', bdrName:'MODV Değer Düşüklüğü Karşılıkları (-)', tmsCode:'268', section:'DURAN', isNegative:true },
  { bdrCode:'268', bdrName:'Birikmiş Amortismanlar (MODV) (-)', tmsCode:'268', section:'DURAN', isNegative:true },
  // Gelecek Yıllara Ait Giderler
  { bdrCode:'280', bdrName:'Peşin Ödenmiş Giderler (UV)', tmsCode:'280', section:'DURAN' },
  { bdrCode:'281', bdrName:'Gelir Tahakkukları (UV)', tmsCode:'281', section:'DURAN' },
  // Diğer Duran Varlıklar
  { bdrCode:'289', bdrName:'Ertelenmiş Vergi Varlığı', tmsCode:'291', section:'DURAN' },
  { bdrCode:'291', bdrName:'Gelecek Yıllarda İndirilecek KDV', tmsCode:'291', section:'DURAN' },
  { bdrCode:'292', bdrName:'Diğer KDV (UV)', tmsCode:'292', section:'DURAN' },
  { bdrCode:'293', bdrName:'Peşin Ödenen Vergi ve Fonlar (UV)', tmsCode:'295', section:'DURAN' },
  { bdrCode:'297', bdrName:'Diğer Çeşitli Duran Varlıklar', tmsCode:'297', section:'DURAN' },

  // ─── 3. KISA VADELİ YÜKÜMLÜLÜKLER ───
  // 30 - Mali Borçlar (KV)
  { bdrCode:'300', bdrName:'Banka Kredileri', tmsCode:'300', section:'KV_YUK' },
  { bdrCode:'301', bdrName:'Diğer Finans Kuruluşlarına Borçlar', tmsCode:'309', section:'KV_YUK' },
  { bdrCode:'302', bdrName:'UV Kredilerin Anapara Taksitleri ve Faizleri', tmsCode:'303', section:'KV_YUK' },
  { bdrCode:'303', bdrName:'Kiralama İşlemlerinden Kaynaklanan Yükümlülükler (KV)', tmsCode:'301', section:'KV_YUK', tmsNote:'Operasyonel kiralama → 329' },
  { bdrCode:'304', bdrName:'Çıkarılmış KV Borçlanma Araçları', tmsCode:'304-305', section:'KV_YUK' },
  { bdrCode:'307', bdrName:'Diğer Finansal Yükümlülükler (KV)', tmsCode:'309', section:'KV_YUK' },
  { bdrCode:'308', bdrName:'Ertelenmiş Borçlanma Maliyetleri (-)', tmsCode:'302', section:'KV_YUK', isNegative:true },
  { bdrCode:'309', bdrName:'Türev Araçlardan Borçlar (KV)', tmsCode:'336', section:'KV_YUK' },
  // 32 - Ticari Borçlar (KV)
  { bdrCode:'320', bdrName:'Satıcılar', tmsCode:'320', section:'KV_YUK' },
  { bdrCode:'321', bdrName:'Borç Senetleri', tmsCode:'321', section:'KV_YUK' },
  { bdrCode:'322', bdrName:'Verilen İleri Tarihli Çekler', tmsCode:'103', section:'KV_YUK' },
  { bdrCode:'325', bdrName:'Diğer Ticari Borçlar (KV)', tmsCode:'329', section:'KV_YUK' },
  { bdrCode:'326', bdrName:'İlişkili Taraflara Ticari Borçlar', tmsCode:'329', section:'KV_YUK' },
  { bdrCode:'328', bdrName:'Ertelenmiş Vade Farkı Giderleri (-)', tmsCode:'322', section:'KV_YUK', isNegative:true },
  // 33 - Diğer Borçlar (KV)
  { bdrCode:'331', bdrName:'Ortaklara Borçlar', tmsCode:'331', section:'KV_YUK' },
  { bdrCode:'332', bdrName:'Ortaklıklara Borçlar', tmsCode:'332-333', section:'KV_YUK' },
  { bdrCode:'333', bdrName:'Diğer İlişkili Taraflara Borçlar', tmsCode:'332', section:'KV_YUK' },
  { bdrCode:'334', bdrName:'Alınan Depozito ve Teminatlar', tmsCode:'326', section:'KV_YUK' },
  { bdrCode:'335', bdrName:'Personele Borçlar', tmsCode:'335', section:'KV_YUK' },
  { bdrCode:'337', bdrName:'Diğer Çeşitli Borçlar (KV)', tmsCode:'336', section:'KV_YUK' },
  // 34 - Alınan Avanslar
  { bdrCode:'345', bdrName:'Alınan Sipariş Avansları', tmsCode:'340', section:'KV_YUK' },
  { bdrCode:'346', bdrName:'Alınan İş Avansları', tmsCode:'340', section:'KV_YUK' },
  { bdrCode:'348', bdrName:'Alınan Diğer Avanslar', tmsCode:'349', section:'KV_YUK' },
  // 36 - Ödenecek Vergi
  { bdrCode:'360', bdrName:'Gelir Üzerinden Alınan Vergiler', tmsCode:'360', section:'KV_YUK' },
  { bdrCode:'361', bdrName:'Sorumlu Sıfatıyla Ödenecek Vergiler', tmsCode:'369', section:'KV_YUK' },
  { bdrCode:'362', bdrName:'Ödenecek KDV', tmsCode:'360', section:'KV_YUK' },
  { bdrCode:'364', bdrName:'Ödenecek Diğer Vergiler', tmsCode:'369', section:'KV_YUK' },
  { bdrCode:'365', bdrName:'Ödenecek SGK Kesintileri', tmsCode:'361', section:'KV_YUK' },
  { bdrCode:'369', bdrName:'Ödenecek Diğer Yükümlülükler', tmsCode:'369', section:'KV_YUK' },
  // 37 - Borç ve Gider Karşılıkları
  { bdrCode:'370', bdrName:'Dönem Kârı Vergi ve Yasal Yük. Karşılıkları', tmsCode:'370', section:'KV_YUK' },
  { bdrCode:'371', bdrName:'Peşin Ödenen Vergi ve Yasal Yük. (-)', tmsCode:'371', section:'KV_YUK', isNegative:true },
  { bdrCode:'372', bdrName:'Kıdem Tazminatı Karşılıkları (KV)', tmsCode:'372', section:'KV_YUK' },
  { bdrCode:'373', bdrName:'Çalışanlara Sağlanacak Diğer Fayda Karşılıkları (KV)', tmsCode:'372', section:'KV_YUK' },
  { bdrCode:'374', bdrName:'Gider Karşılıkları', tmsCode:'379', section:'KV_YUK' },
  { bdrCode:'375', bdrName:'Garanti Karşılıkları', tmsCode:'379', section:'KV_YUK' },
  { bdrCode:'379', bdrName:'Diğer Karşılıklar (KV)', tmsCode:'379', section:'KV_YUK' },
  // 38 - Ertelenmiş Gelirler
  { bdrCode:'380', bdrName:'Ertelenmiş Gelirler (KV)', tmsCode:'380', section:'KV_YUK' },
  { bdrCode:'385', bdrName:'Gider Tahakkukları (KV)', tmsCode:'381', section:'KV_YUK' },
  { bdrCode:'395', bdrName:'Diğer Çeşitli KV Yükümlülükler', tmsCode:'399', section:'KV_YUK' },

  // ─── 4. UZUN VADELİ YÜKÜMLÜLÜKLER ───
  { bdrCode:'400', bdrName:'Banka Kredileri (UV)', tmsCode:'400', section:'UV_YUK' },
  { bdrCode:'401', bdrName:'Diğer Finans Kuruluşlarına Borçlar (UV)', tmsCode:'409', section:'UV_YUK' },
  { bdrCode:'403', bdrName:'Kiralama İşlemlerinden Kaynaklanan Yükümlülükler (UV)', tmsCode:'401', section:'UV_YUK', tmsNote:'Operasyonel kiralama → 329' },
  { bdrCode:'405', bdrName:'Çıkarılmış UV Borçlanma Araçları', tmsCode:'405', section:'UV_YUK' },
  { bdrCode:'407', bdrName:'Diğer Finansal Yükümlülükler (UV)', tmsCode:'409', section:'UV_YUK' },
  { bdrCode:'408', bdrName:'Ertelenmiş Borçlanma Maliyetleri (UV) (-)', tmsCode:'402', section:'UV_YUK', isNegative:true },
  { bdrCode:'409', bdrName:'Türev Araçlardan Borçlar (UV)', tmsCode:'436', section:'UV_YUK' },
  // Ticari Borçlar (UV)
  { bdrCode:'420', bdrName:'Satıcılar (UV)', tmsCode:'420', section:'UV_YUK' },
  { bdrCode:'425', bdrName:'Diğer Ticari Borçlar (UV)', tmsCode:'429', section:'UV_YUK' },
  { bdrCode:'426', bdrName:'İlişkili Taraflara Ticari Borçlar (UV)', tmsCode:'429', section:'UV_YUK' },
  // Diğer Borçlar (UV)
  { bdrCode:'431', bdrName:'Ortaklara Borçlar (UV)', tmsCode:'431', section:'UV_YUK' },
  { bdrCode:'432', bdrName:'Ortaklıklara Borçlar (UV)', tmsCode:'432-433', section:'UV_YUK' },
  // Karşılıklar (UV)
  { bdrCode:'472', bdrName:'Kıdem Tazminatı Karşılıkları (UV)', tmsCode:'472', section:'UV_YUK' },
  { bdrCode:'473', bdrName:'Çalışanlara Sağlanacak Diğer Fayda Karşılıkları (UV)', tmsCode:'472', section:'UV_YUK' },
  { bdrCode:'479', bdrName:'Diğer Karşılıklar (UV)', tmsCode:'479', section:'UV_YUK' },
  // Ertelenmiş
  { bdrCode:'480', bdrName:'Ertelenmiş Gelirler (UV)', tmsCode:'480', section:'UV_YUK' },
  { bdrCode:'485', bdrName:'Gider Tahakkukları (UV)', tmsCode:'481', section:'UV_YUK' },
  { bdrCode:'489', bdrName:'Ertelenmiş Vergi Yükümlülüğü', tmsCode:'492', section:'UV_YUK' },
  { bdrCode:'492', bdrName:'Diğer KDV (UV)', tmsCode:'492', section:'UV_YUK' },
  { bdrCode:'495', bdrName:'Diğer Çeşitli UV Yükümlülükler', tmsCode:'499', section:'UV_YUK' },

  // ─── 5. ÖZKAYNAKLAR ───
  { bdrCode:'500', bdrName:'Sermaye', tmsCode:'500', section:'OZKAYNAK' },
  { bdrCode:'501', bdrName:'Ödenmemiş Sermaye (-)', tmsCode:'501', section:'OZKAYNAK', isNegative:true },
  { bdrCode:'502', bdrName:'Sermaye Düzeltmesi Olumlu Farkları', tmsCode:'502', section:'OZKAYNAK' },
  { bdrCode:'503', bdrName:'Sermaye Düzeltmesi Olumsuz Farkları (-)', tmsCode:'503', section:'OZKAYNAK', isNegative:true },
  { bdrCode:'515', bdrName:'Geri Alınmış Paylar (-)', tmsCode:'501', section:'OZKAYNAK', isNegative:true },
  { bdrCode:'520', bdrName:'Pay İhraç Primleri', tmsCode:'520', section:'OZKAYNAK' },
  { bdrCode:'540', bdrName:'Kârdan Ayrılan Yasal Yedekler', tmsCode:'540', section:'OZKAYNAK' },
  { bdrCode:'541', bdrName:'Statü Yedekleri', tmsCode:'541', section:'OZKAYNAK' },
  { bdrCode:'542', bdrName:'Olağanüstü Yedekler', tmsCode:'542', section:'OZKAYNAK' },
  { bdrCode:'548', bdrName:'Diğer Kâr Yedekleri', tmsCode:'549', section:'OZKAYNAK' },
  { bdrCode:'549', bdrName:'Diğer Kâr Yedekleri (Çeşitli)', tmsCode:'548', section:'OZKAYNAK' },
  // DKG kalemleri
  { bdrCode:'550', bdrName:'Özkaynak Araçlarına Yapılan Yatırımlardan Kazançlar/Kayıplar (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  { bdrCode:'551', bdrName:'MDV Yeniden Değerleme Artışları', tmsCode:'522', section:'OZKAYNAK' },
  { bdrCode:'553', bdrName:'Tanımlanmış Fayda Planları Yeniden Ölçüm (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  { bdrCode:'556', bdrName:'Yabancı Para Çevrim Farkları (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  { bdrCode:'557', bdrName:'Özkaynak Yönt. Yatırımlar DKG Payları (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  { bdrCode:'560', bdrName:'Yabancı Para Çevrim Farkları (Sınıflandırılacak) (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  { bdrCode:'562', bdrName:'Nakit Akış Riskinden Korunma (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  { bdrCode:'567', bdrName:'Özkaynak Yönt. Yatırımlar Sınıflandırılacak DKG Payları (±)', tmsCode:'548-563', section:'OZKAYNAK' },
  // Geçmiş Yıl Kârları / Zararları
  { bdrCode:'570', bdrName:'Geçmiş Yıllar Kârları', tmsCode:'570', section:'OZKAYNAK' },
  { bdrCode:'571', bdrName:'Muhasebe Politikaları Düzeltme Kârları', tmsCode:'570', section:'OZKAYNAK' },
  { bdrCode:'579', bdrName:'Ödenen Kâr Payı Avansları (-)', tmsCode:'563', section:'OZKAYNAK', isNegative:true },
  { bdrCode:'580', bdrName:'Geçmiş Yıllar Zararları (-)', tmsCode:'580', section:'OZKAYNAK', isNegative:true },
  { bdrCode:'590', bdrName:'Dönem Net Kârı', tmsCode:'590', section:'OZKAYNAK' },
  { bdrCode:'591', bdrName:'Dönem Net Zararı (-)', tmsCode:'591', section:'OZKAYNAK', isNegative:true },

  // ─── 6. GELİR TABLOSU ───
  { bdrCode:'600', bdrName:'Yurt İçi Satışlar', tmsCode:'600', section:'GELIR' },
  { bdrCode:'601', bdrName:'Yurt Dışı Satışlar', tmsCode:'601', section:'GELIR' },
  { bdrCode:'609', bdrName:'Diğer Satış Hasılatları', tmsCode:'602', section:'GELIR' },
  { bdrCode:'610', bdrName:'Satıştan İadeler (-)', tmsCode:'610', section:'GELIR', isNegative:true },
  { bdrCode:'611', bdrName:'Satış İskontoları (-)', tmsCode:'611', section:'GELIR', isNegative:true },
  { bdrCode:'612', bdrName:'Diğer İndirimler (-)', tmsCode:'612', section:'GELIR', isNegative:true },
  { bdrCode:'620', bdrName:'Satılan Mamuller Maliyeti (-)', tmsCode:'620', section:'GELIR', isNegative:true },
  { bdrCode:'621', bdrName:'Satılan Ticari Mallar Maliyeti (-)', tmsCode:'621', section:'GELIR', isNegative:true },
  { bdrCode:'622', bdrName:'Sunulan Hizmet Maliyeti (-)', tmsCode:'622', section:'GELIR', isNegative:true },
  { bdrCode:'623', bdrName:'Diğer Satışların Maliyeti (-)', tmsCode:'623', section:'GELIR', isNegative:true },
  { bdrCode:'630', bdrName:'Araştırma ve Geliştirme Giderleri (-)', tmsCode:'630', section:'GELIR', isNegative:true },
  { bdrCode:'631', bdrName:'Pazarlama, Satış ve Dağıtım Giderleri (-)', tmsCode:'631', section:'GELIR', isNegative:true },
  { bdrCode:'632', bdrName:'Genel Yönetim Giderleri (-)', tmsCode:'632', section:'GELIR', isNegative:true },
  // Diğer Faaliyet Gelirleri
  { bdrCode:'640', bdrName:'Esas Faaliyet Alacaklarına İlişkin Vade Farkı/Kur Farkı Kazançları', tmsCode:'646', section:'GELIR' },
  { bdrCode:'641', bdrName:'Esas Faal. Alacaklarına İlişkin Konusu Kalmayan Karşılıklar', tmsCode:'644', section:'GELIR' },
  { bdrCode:'644', bdrName:'Esas Faaliyetlerden Diğer Çeşitli Gelir ve Kazançlar', tmsCode:'649', section:'GELIR' },
  { bdrCode:'645', bdrName:'Özkaynak Yönt. Değerlenen Yatırımların Kârlarından Paylar', tmsCode:'641', section:'GELIR' },
  { bdrCode:'646', bdrName:'Ortaklıklardaki Yatırımlardan Sağlanan Gelir', tmsCode:'641', section:'GELIR' },
  { bdrCode:'648', bdrName:'MDV/MODV Satışından Ortaya Çıkan Kazançlar', tmsCode:'649', section:'GELIR' },
  { bdrCode:'649', bdrName:'Diğer Faaliyetlerden Çeşitli Gelir ve Kazançlar', tmsCode:'649', section:'GELIR' },
  // Diğer Faaliyet Giderleri
  { bdrCode:'650', bdrName:'Ticari Borçlara İlişkin Vade Farkı/Kur Farkı Zararları (-)', tmsCode:'656', section:'GELIR', isNegative:true },
  { bdrCode:'651', bdrName:'Esas Faal. Alacaklarına İlişkin Değer Düşüklüğü Karşılık Giderleri (-)', tmsCode:'654', section:'GELIR', isNegative:true },
  { bdrCode:'654', bdrName:'Esas Faaliyetlerden Diğer Çeşitli Gider ve Zararlar (-)', tmsCode:'659', section:'GELIR', isNegative:true },
  { bdrCode:'655', bdrName:'Özkaynak Yönt. Değerlenen Yatırımların Zararlarından Paylar (-)', tmsCode:'659', section:'GELIR', isNegative:true },
  { bdrCode:'659', bdrName:'Diğer Faaliyetlerden Çeşitli Gider ve Zararlar (-)', tmsCode:'659', section:'GELIR', isNegative:true },
  // Finansman Gelirleri
  { bdrCode:'660', bdrName:'Mevduat Faiz Gelirleri', tmsCode:'642', section:'GELIR' },
  { bdrCode:'661', bdrName:'Menkul Kıymet Yatırımlarından Faiz Gelirleri', tmsCode:'642', section:'GELIR' },
  { bdrCode:'663', bdrName:'Diğer Faiz Gelirleri', tmsCode:'642', section:'GELIR' },
  { bdrCode:'664', bdrName:'Kur Farkı Kazançları', tmsCode:'646', section:'GELIR' },
  { bdrCode:'668', bdrName:'Diğer Finansal Gelirler', tmsCode:'642', section:'GELIR' },
  { bdrCode:'669', bdrName:'Net Parasal Pozisyon Kazançları (Enflasyon Düzeltmesi Kârları)', tmsCode:'648', section:'GELIR' },
  // Finansman Giderleri
  { bdrCode:'670', bdrName:'Kısa Vadeli Finansal Borçlanma Maliyetleri (-)', tmsCode:'660', section:'GELIR', isNegative:true },
  { bdrCode:'671', bdrName:'Uzun Vadeli Finansal Borçlanma Maliyetleri (-)', tmsCode:'661', section:'GELIR', isNegative:true },
  { bdrCode:'674', bdrName:'Kur Farkı Zararları (-)', tmsCode:'656', section:'GELIR', isNegative:true },
  { bdrCode:'678', bdrName:'Diğer Finansal Giderler (-)', tmsCode:'659', section:'GELIR', isNegative:true },
  { bdrCode:'679', bdrName:'Net Parasal Pozisyon Zararları (Enflasyon Düzeltme Zararları) (-)', tmsCode:'658', section:'GELIR', isNegative:true },
  // Vergi
  { bdrCode:'691', bdrName:'Sürdürülen Faaliyetler Dönem Kârı Yasal Vergi Gideri (-)', tmsCode:'691', section:'GELIR', isNegative:true },
  { bdrCode:'692', bdrName:'Sürdürülen Faal. Ertelenmiş Vergi Geliri/Gideri (±)', tmsCode:'>0 679 / <0 689', section:'GELIR', tmsNote:'Pozitif ise 679, negatif ise 689' },
];

// Mapping kurallarını section'a göre grupla
export const getMappingsBySection = () => {
  const grouped = {};
  Object.keys(BDR_SECTIONS).forEach(k => { grouped[k] = []; });
  MAPPING_RULES.forEach(r => {
    if (grouped[r.section]) grouped[r.section].push(r);
  });
  return grouped;
};

// BDR kodu ile mapping bul
export const findMapping = (bdrCode) => {
  return MAPPING_RULES.filter(r => r.bdrCode === bdrCode);
};

// TMS kodu ile ters mapping bul
export const findReverseMappings = (tmsCode) => {
  return MAPPING_RULES.filter(r => r.tmsCode === tmsCode);
};
