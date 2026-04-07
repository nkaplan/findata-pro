import { useState, useRef, useCallback, useMemo } from 'react';
import { YEARS, USERS, createInitialData, BOARD_MEMBERS, COMPANY_INFO, FILINGS_INFO } from './data';
import {
  fmtS, fmtN, pctChange, Icon, PATHS, BarChart, KPICard, Toast, DataTable, EditableCell,
} from './components';
import {
  TMS_BILANCO, createTmsValues, TMS_GROUP_CODES, NEGATIVE_CODES, calcGroupTotal,
  TMS_GELIR, createGelirValues, GELIR_GROUP_CODES, computeGelirTotal,
} from './tmsData';
import {
  MAPPING_RULES, BDR_SECTIONS,
} from './mappingData';

const EXTRA_PATHS = {
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  clipboard: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z',
  alert: 'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
};

// ═══ LOGIN ═══
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('demo@demo.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true); setError('');
    setTimeout(() => {
      const user = USERS[email];
      if (user && user.pw === password) onLogin({ email, name: user.name, org: user.org, plan: user.plan });
      else setError('Geçersiz e-posta veya şifre');
      setLoading(false);
    }, 500);
  };

  const inp = { width:'100%',padding:'12px 16px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(15,23,42,0.6)',color:'#e2e8f0',fontSize:14,outline:'none',boxSizing:'border-box' };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#0a0e17,#111827,#0f172a)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)',backgroundSize:'64px 64px'}}/>
      <div style={{position:'relative',zIndex:2,width:'100%',maxWidth:420,padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:12,marginBottom:12}}>
            <div style={{width:48,height:48,borderRadius:12,background:'linear-gradient(135deg,#3b82f6,#10b981)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Icon path={PATHS.chart} size={22} color="#fff"/>
            </div>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,color:'#f1f5f9'}}>FinData<span style={{color:'#3b82f6'}}>Pro</span></span>
          </div>
          <p style={{color:'#64748b',fontSize:12,letterSpacing:'0.05em',textTransform:'uppercase',fontWeight:500}}>Financial Report Intelligence Platform</p>
        </div>
        <div style={{background:'rgba(15,23,42,0.85)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:20,padding:'36px 30px',backdropFilter:'blur(24px)',boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5)'}}>
          <h2 style={{color:'#e2e8f0',fontSize:18,fontWeight:600,marginBottom:4,textAlign:'center'}}>Güvenli Giriş</h2>
          <p style={{color:'#64748b',fontSize:12,textAlign:'center',marginBottom:24}}>Kurumsal hesabınızla oturum açın</p>
          <form onSubmit={handleSubmit}>
            <label style={{display:'block',color:'#94a3b8',fontSize:10,fontWeight:600,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>E-posta</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{...inp,marginBottom:16}}/>
            <label style={{display:'block',color:'#94a3b8',fontSize:10,fontWeight:600,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Şifre</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{...inp,marginBottom:20}}/>
            {error&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',color:'#fca5a5',padding:'8px 12px',borderRadius:8,fontSize:12,marginBottom:14,textAlign:'center'}}>{error}</div>}
            <button type="submit" disabled={loading} style={{width:'100%',padding:'13px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'#fff',fontSize:14,fontWeight:600,opacity:loading?0.7:1,cursor:'pointer'}}>{loading?'Giriş yapılıyor...':'Giriş Yap'}</button>
          </form>
          <div style={{marginTop:20,padding:12,background:'rgba(59,130,246,0.05)',borderRadius:8,border:'1px solid rgba(59,130,246,0.08)'}}>
            <p style={{color:'#64748b',fontSize:10,textAlign:'center',margin:0}}><strong style={{color:'#94a3b8'}}>Demo:</strong> demo@demo.com / demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ MAPPING EDITOR ═══
const sectionColors = {DONEN:'#3b82f6',DURAN:'#8b5cf6',KV_YUK:'#ef4444',UV_YUK:'#f97316',OZKAYNAK:'#10b981',GELIR:'#f59e0b'};
const thS = {textAlign:'center',padding:'8px 8px',color:'#64748b',fontWeight:600,fontSize:8,textTransform:'uppercase',letterSpacing:'0.05em'};
const tdS = {padding:'5px 8px',textAlign:'center',fontSize:10};

function MappingEditor({mappings,onUpdate,onToast}){
  const [search,setSearch]=useState('');
  const [secF,setSecF]=useState('ALL');
  const [editIdx,setEditIdx]=useState(null);
  const [editVal,setEditVal]=useState('');
  const [editNote,setEditNote]=useState('');
  const [changed,setChanged]=useState(new Set());
  const [showChanged,setShowChanged]=useState(false);

  const filtered=useMemo(()=>{
    return mappings.map((m,i)=>({...m,origIdx:i})).filter(m=>{
      if(secF!=='ALL'&&m.section!==secF)return false;
      if(showChanged&&!changed.has(m.origIdx))return false;
      if(search){const s=search.toLowerCase();return m.bdrCode.toLowerCase().includes(s)||m.bdrName.toLowerCase().includes(s)||m.tmsCode.toLowerCase().includes(s)||(m.tmsNote||'').toLowerCase().includes(s);}
      return true;
    });
  },[mappings,search,secF,showChanged,changed]);

  const startEdit=(idx,rule)=>{setEditIdx(idx);setEditVal(rule.tmsCode);setEditNote(rule.tmsNote||'');};
  const saveEdit=()=>{if(editIdx===null)return;const u=[...mappings];u[editIdx]={...u[editIdx],tmsCode:editVal.trim(),tmsNote:editNote.trim()||undefined};onUpdate(u);setChanged(p=>new Set(p).add(editIdx));setEditIdx(null);onToast(`BDR ${u[editIdx].bdrCode} → TMS ${editVal.trim()} güncellendi`);};
  const cancelEdit=()=>{setEditIdx(null);};
  const kd=(e)=>{if(e.key==='Enter')saveEdit();if(e.key==='Escape')cancelEdit();};

  const stats=useMemo(()=>{const s={};Object.keys(BDR_SECTIONS).forEach(k=>{s[k]=0;});mappings.forEach(m=>{if(s[m.section]!==undefined)s[m.section]++;});return{total:mappings.length,sections:s,changed:changed.size};},[mappings,changed]);

  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:3}}>BDR → TMS Mapping Kuralları</h2>
          <p style={{color:'#64748b',fontSize:11}}>BDR kalemlerinin TMS hesap planı eşleştirmesini görüntüleyin ve düzenleyin • <span style={{color:'#f59e0b'}}>Excel'e çıktı almadan önce mapping'leri güncelleyin</span></p>
        </div>
        {changed.size>0&&<div style={{background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.3)',borderRadius:8,padding:'6px 14px',display:'flex',alignItems:'center',gap:6}}>
          <Icon path={PATHS.edit} size={12} color="#f59e0b"/><span style={{color:'#f59e0b',fontSize:11,fontWeight:600}}>{changed.size} mapping güncellendi</span>
        </div>}
      </div>

      {/* Stats */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:18}}>
        <div style={{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,padding:'8px 14px',flex:'1 1 auto'}}>
          <div style={{color:'#64748b',fontSize:8,fontWeight:600,textTransform:'uppercase'}}>Toplam</div>
          <div style={{color:'#e2e8f0',fontSize:18,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{stats.total}</div>
        </div>
        {Object.entries(BDR_SECTIONS).map(([k,label])=>(
          <div key={k} style={{background:`${sectionColors[k]}08`,border:`1px solid ${sectionColors[k]}20`,borderRadius:8,padding:'8px 14px',flex:'1 1 auto',cursor:'pointer',outline:secF===k?`2px solid ${sectionColors[k]}`:'none'}} onClick={()=>setSecF(secF===k?'ALL':k)}>
            <div style={{color:'#64748b',fontSize:7,fontWeight:600,textTransform:'uppercase'}}>{label}</div>
            <div style={{color:sectionColors[k],fontSize:14,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{stats.sections[k]}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{display:'flex',gap:8,marginBottom:16,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:'1 1 280px'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="BDR kodu, kalem adı veya TMS kodu ara..." style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid rgba(59,130,246,0.15)',background:'rgba(15,23,42,0.6)',color:'#e2e8f0',fontSize:11,outline:'none',boxSizing:'border-box'}}/>
        </div>
        <select value={secF} onChange={e=>setSecF(e.target.value)} style={{padding:'8px 12px',borderRadius:8,border:'1px solid rgba(59,130,246,0.15)',background:'rgba(15,23,42,0.6)',color:'#e2e8f0',fontSize:11,outline:'none'}}>
          <option value="ALL">Tüm Bölümler</option>
          {Object.entries(BDR_SECTIONS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
        </select>
        {changed.size>0&&<button onClick={()=>setShowChanged(!showChanged)} style={{padding:'8px 12px',borderRadius:8,border:`1px solid ${showChanged?'rgba(245,158,11,0.4)':'rgba(148,163,184,0.15)'}`,background:showChanged?'rgba(245,158,11,0.1)':'transparent',color:showChanged?'#f59e0b':'#94a3b8',fontSize:10,fontWeight:600,cursor:'pointer'}}>{showChanged?'✓ Sadece değişenler':'Değişenleri göster'}</button>}
        <div style={{color:'#475569',fontSize:10}}>{filtered.length} sonuç</div>
      </div>

      {/* Table */}
      <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,overflow:'hidden'}}>
        <div style={{overflowX:'auto',maxHeight:520,overflowY:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead style={{position:'sticky',top:0,zIndex:5,background:'rgba(15,23,42,0.98)'}}>
              <tr style={{borderBottom:'2px solid rgba(59,130,246,0.15)'}}>
                <th style={thS}>Bölüm</th><th style={thS}>BDR Kodu</th><th style={{...thS,textAlign:'left',minWidth:250}}>BDR Kalem Adı</th><th style={{...thS,textAlign:'center'}}>→</th><th style={{...thS,minWidth:100}}>TMS Hesap</th><th style={{...thS,textAlign:'left',minWidth:180}}>Not</th><th style={{...thS,textAlign:'left'}}>İşaret</th><th style={{...thS,width:60,textAlign:'center'}}>Düzenle</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rule)=>{
                const idx=rule.origIdx;const isE=editIdx===idx;const isC=changed.has(idx);const sc=sectionColors[rule.section]||'#64748b';
                return(
                  <tr key={idx} style={{borderBottom:'1px solid rgba(148,163,184,0.04)',background:isE?'rgba(59,130,246,0.06)':isC?'rgba(245,158,11,0.04)':'transparent'}}>
                    <td style={tdS}><span style={{background:`${sc}15`,color:sc,padding:'2px 6px',borderRadius:4,fontSize:8,fontWeight:600,whiteSpace:'nowrap'}}>{(BDR_SECTIONS[rule.section]||'').slice(0,10)}</span></td>
                    <td style={{...tdS,fontFamily:"'DM Mono',monospace",color:'#60a5fa',fontWeight:600}}>{rule.bdrCode}</td>
                    <td style={{...tdS,textAlign:'left',color:'#cbd5e1',fontSize:10}}>{rule.bdrName}</td>
                    <td style={{...tdS,textAlign:'center',color:'#475569'}}>→</td>
                    <td style={tdS}>{isE?<input value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={kd} autoFocus style={{width:90,padding:'3px 6px',borderRadius:4,border:'1px solid #3b82f6',background:'rgba(59,130,246,0.12)',color:'#e2e8f0',fontSize:10,fontFamily:"'DM Mono',monospace",outline:'none',textAlign:'center'}}/>:<span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:isC?'#f59e0b':'#10b981',fontSize:11}}>{rule.tmsCode}</span>}</td>
                    <td style={{...tdS,textAlign:'left'}}>{isE?<input value={editNote} onChange={e=>setEditNote(e.target.value)} onKeyDown={kd} placeholder="Not..." style={{width:'100%',padding:'3px 6px',borderRadius:4,border:'1px solid rgba(59,130,246,0.3)',background:'rgba(59,130,246,0.06)',color:'#e2e8f0',fontSize:9,outline:'none'}}/>:<span style={{color:'#475569',fontSize:9}}>{rule.tmsNote||'—'}</span>}</td>
                    <td style={{...tdS,textAlign:'left'}}>{rule.isNegative?<span style={{color:'#ef4444',fontSize:9,fontWeight:600}}>(-)</span>:<span style={{color:'#475569',fontSize:9}}>(+)</span>}</td>
                    <td style={{...tdS,textAlign:'center'}}>{isE?<div style={{display:'flex',gap:3,justifyContent:'center'}}><button onClick={saveEdit} style={{background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.3)',borderRadius:4,padding:3,cursor:'pointer',display:'flex',alignItems:'center'}}><Icon path={PATHS.check} size={10} color="#10b981"/></button><button onClick={cancelEdit} style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:4,padding:3,cursor:'pointer',display:'flex',alignItems:'center'}}><Icon path={PATHS.x} size={10} color="#ef4444"/></button></div>:<button onClick={()=>startEdit(idx,rule)} style={{background:'none',border:'none',cursor:'pointer',padding:4,opacity:0.4}} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0.4}><Icon path={PATHS.edit} size={11} color="#60a5fa"/></button>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Panels */}
      <div style={{marginTop:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
          <h4 style={{color:'#e2e8f0',fontSize:12,fontWeight:600,marginBottom:10,display:'flex',alignItems:'center',gap:6}}><Icon path={EXTRA_PATHS.clipboard} size={14} color="#3b82f6"/> Mapping Öncelik Sırası</h4>
          {[{n:1,t:'Dipnotta açıkça belirtilen alt kırılım',c:'#10b981'},{n:2,t:'Ana tablo + dipnot başlığı uyumu',c:'#3b82f6'},{n:3,t:'Muhasebe mantığına göre en yakın TMS kalemi',c:'#f59e0b'},{n:4,t:'Gerekirse "diğer" nitelikli uygun TMS kalemi',c:'#8b5cf6'}].map(p=>(
            <div key={p.n} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0'}}>
              <div style={{width:20,height:20,borderRadius:5,background:`${p.c}22`,color:p.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0}}>{p.n}</div>
              <span style={{color:'#94a3b8',fontSize:10}}>{p.t}</span>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
          <h4 style={{color:'#e2e8f0',fontSize:12,fontWeight:600,marginBottom:10,display:'flex',alignItems:'center',gap:6}}><Icon path={EXTRA_PATHS.alert} size={14} color="#ef4444"/> Dikkat Edilecekler</h4>
          {['Ticari alacakları diğer alacaklara atamayın','Finansal borçları ticari borçlara atamayın','Peşin ödenmiş giderleri stoklara atamayın','Yatırım amaçlı gayrimenkulü MDV\'ye atamayın','Kısa vadeli kısmı uzun vadeliye taşımayın','Geçmiş yıl kârlarını dönem kârına karıştırmayın'].map((t,i)=>(
            <div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0'}}><span style={{color:'#ef4444',fontSize:10,flexShrink:0}}>✗</span><span style={{color:'#94a3b8',fontSize:9}}>{t}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══ VALIDATION PANEL ═══
function ValidationPanel({tmsValues,gelirValues,tmsYear}){
  const checks=useMemo(()=>{
    const g=k=>calcGroupTotal(k,tmsValues,tmsYear);
    const aktif=g('aktif'),pasif=g('pasif'),fark=aktif-pasif;
    const netKar=computeGelirTotal('net_kar',gelirValues,tmsYear);
    const bilancoKar=tmsValues['590']?.[tmsYear]||0;
    return[
      {l:'Dönen Varlıklar',v:g('donen'),ok:true},{l:'Duran Varlıklar',v:g('duran'),ok:true},
      {l:'Aktif Toplam',v:aktif,ok:true},{l:'Kısa Vadeli Yük.',v:g('kv'),ok:true},
      {l:'Uzun Vadeli Yük.',v:g('uv'),ok:true},{l:'Özkaynaklar',v:g('ozkaynak'),ok:true},
      {l:'Pasif Toplam',v:pasif,ok:true},{l:'Aktif - Pasif Fark',v:fark,ok:fark===0},
      {l:'Bilanço K/Z vs Gelir Tablosu',v:bilancoKar-netKar,ok:Math.abs(bilancoKar-netKar)<1},
    ];
  },[tmsValues,gelirValues,tmsYear]);
  const allOk=checks.every(c=>c.ok);

  return(
    <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18,marginTop:20}}>
      <h3 style={{color:'#e2e8f0',fontSize:14,fontWeight:600,marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
        <Icon path={PATHS.check} size={16} color={allOk?'#10b981':'#ef4444'}/> Kalite Kontrol Checklist — {tmsYear}
      </h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
        {checks.map((c,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 10px',borderRadius:6,background:c.ok?'rgba(16,185,129,0.04)':'rgba(239,68,68,0.06)',border:`1px solid ${c.ok?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.15)'}`}}>
            <span style={{fontSize:10,color:c.ok?'#94a3b8':'#fca5a5',fontWeight:500}}>{c.ok?'✓':'✗'} {c.l}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,fontWeight:600,color:c.ok?'#10b981':'#ef4444'}}>{c.v===0&&c.l.includes('Fark')?'0 ✓':fmtN(c.v)}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:10,padding:'8px 12px',borderRadius:6,background:allOk?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)',border:`1px solid ${allOk?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'}`,textAlign:'center'}}>
        <span style={{fontSize:11,fontWeight:600,color:allOk?'#10b981':'#ef4444'}}>{allOk?'✓ Tüm kontroller başarılı — Toplamlar tutarlı':'✗ Uyumsuzluk var — İnceleyin'}</span>
      </div>
    </div>
  );
}

// ═══ DASHBOARD ═══
function Dashboard({user,onLogout}){
  const [tab,setTab]=useState('overview');
  const [data,setData]=useState(createInitialData);
  const [toast,setToast]=useState(null);
  const [editCount,setEditCount]=useState(0);
  const origData=useRef(createInitialData());
  const fileRef=useRef(null);
  const [processing,setProcessing]=useState(false);
  const [files,setFiles]=useState([
    {name:'EYHO_FY2024_Deloitte.pdf',size:6720087,date:'2025-03-12',status:'İşlendi',period:'FY 2024'},
    {name:'EYHO_FY2023_PwC.pdf',size:3200000,date:'2024-04-17',status:'İşlendi',period:'FY 2023'},
  ]);
  const [customMappings,setCustomMappings]=useState(()=>[...MAPPING_RULES]);
  const [tmsValues,setTmsValues]=useState(createTmsValues);
  const [gelirValues,setGelirValues]=useState(createGelirValues);
  const [tmsYear,setTmsYear]=useState('2024');

  const handleCellSave=useCallback((sk,rk,y,nv)=>{
    setData(prev=>{const next={...prev};next[sk]={...next[sk]};next[sk][rk]={...next[sk][rk],[y]:nv};
      let c=0;Object.keys(next).forEach(s=>{Object.keys(next[s]).forEach(r=>{YEARS.forEach(yr=>{if(next[s][r]?.[yr]!==origData.current[s]?.[r]?.[yr])c++;});});});
      setEditCount(c);return next;
    });
  },[]);

  const handleSaveAll=()=>{origData.current=JSON.parse(JSON.stringify(data));const s=editCount;setEditCount(0);setToast(`${s} değişiklik kaydedildi`);};
  const handleReset=()=>{setData(createInitialData());setEditCount(0);setToast('Değişiklikler geri alındı');};

  const [uploadResult,setUploadResult]=useState(null);
  const [processingStep,setProcessingStep]=useState('');

  const handleUpload=async(e)=>{
    const file=e.target.files[0];if(!file)return;
    const ext=file.name.split('.').pop().toLowerCase();

    if(ext!=='xlsx'&&ext!=='xls'){
      setToast('Lütfen .xlsx veya .xls dosyası yükleyin');return;
    }

    setProcessing(true);setUploadResult(null);setProcessingStep('Dosya okunuyor...');

    try{
      const XLSX=await import('xlsx');
      const buf=await file.arrayBuffer();
      setProcessingStep('Excel parse ediliyor...');
      const wb=XLSX.read(buf,{type:'array'});

      // Find BDR sheet or first sheet
      let sheetName=wb.SheetNames.find(s=>s.toUpperCase().includes('BDR'))||null;
      let mizanSheet=wb.SheetNames.find(s=>s.includes('DÖNEM')||s.includes('Mizan'))||null;
      const isBDR=!!sheetName;
      if(!sheetName) sheetName=wb.SheetNames[0];

      setProcessingStep(isBDR?'BDR tablosu ayrıştırılıyor...':'Mizan verisi okunuyor...');

      const ws=wb.Sheets[sheetName];
      const raw=XLSX.utils.sheet_to_json(ws,{header:1,defval:null});

      // --- PARSE: Extract BDR code → value pairs ---
      const extracted={};  // { bdrCode: { values: [v1, v2, ...], name: '...' } }
      let valueCols=[];    // which column indices hold numeric period data
      let periodLabels=[]; // labels for those columns
      let totalRows=0;
      let firmName='';

      if(isBDR){
        // BDR format: col2=code, col3=name, col4-8=period values, col9=VUK code
        // Find the header row to identify value columns
        for(let r=0;r<Math.min(10,raw.length);r++){
          const row=raw[r];
          if(row&&row[3]&&String(row[3]).includes('FİRMA ADI')) firmName=String(row[4]||row[5]||row[6]||row[7]||'').trim();
        }

        // Detect value columns: find cols 4-8 that have numeric data
        const numericCols=[4,5,6,7,8];
        // Check a few data rows to find which cols have numbers
        const sampleRows=raw.slice(8,30).filter(r=>r&&r[2]&&String(r[2]).match(/^\d{3}$/));
        numericCols.forEach(ci=>{
          const hasData=sampleRows.some(r=>r[ci]!=null&&!isNaN(Number(r[ci]))&&Number(r[ci])!==0);
          if(hasData) valueCols.push(ci);
        });
        if(valueCols.length===0) valueCols=[7,8]; // fallback

        // Assign period labels based on column count
        const yearLabels=['2024','2023','2022','2021','2020'];
        periodLabels=valueCols.map((_,i)=>yearLabels[i]||`Dönem ${i+1}`);

        // Extract data rows
        for(let r=7;r<raw.length;r++){
          const row=raw[r];if(!row)continue;
          const code=String(row[2]||'').trim();
          if(!code||!code.match(/^\d{2,3}$/))continue;
          const name=String(row[3]||'').trim();
          if(!name||name==='0')continue;
          const vals=valueCols.map(ci=>{
            const v=row[ci];
            return(v!=null&&!isNaN(Number(v)))?Number(v):0;
          });
          if(vals.every(v=>v===0))continue; // skip all-zero rows
          extracted[code]={values:vals,name};
          totalRows++;
        }
      } else {
        // Mizan format: col0=hesapKodu, col1=hesapAdı, col2=borç, col3=alacak, col4=bakiyeBorç, col5=bakiyeAlacak
        valueCols=[4,5]; // bakiye borç, bakiye alacak
        periodLabels=['Bakiye Borç','Bakiye Alacak'];

        for(let r=5;r<raw.length;r++){
          const row=raw[r];if(!row)continue;
          const code=String(row[0]||'').trim();
          if(!code||!code.match(/^\d{2,3}$/))continue;
          const name=String(row[1]||'').trim();
          const bakBor=Number(row[4])||0;
          const bakAlc=Number(row[5])||0;
          const net=bakBor-bakAlc; // net bakiye
          if(net===0)continue;
          extracted[code]={values:[net],name};
          totalRows++;
        }
        periodLabels=['Dönem'];
      }

      setProcessingStep('Mapping kuralları uygulanıyor...');
      await new Promise(r=>setTimeout(r,300));

      // --- MAP: BDR codes → TMS codes using customMappings ---
      const newTmsValues={};
      const newGelirValues={};
      const mappingLog=[];
      let mappedCount=0, unmappedCodes=[];

      Object.entries(extracted).forEach(([bdrCode,{values,name}])=>{
        // Find mapping rule for this BDR code
        const rule=customMappings.find(m=>m.bdrCode===bdrCode);
        if(!rule){
          unmappedCodes.push({code:bdrCode,name});
          return;
        }

        const tmsCode=rule.tmsCode;
        // Skip complex/conditional codes
        if(tmsCode.includes('/')&&tmsCode.includes('>')){
          unmappedCodes.push({code:bdrCode,name,note:'Koşullu mapping — manuel inceleme gerekli'});
          return;
        }

        // Determine sign
        const sign=rule.isNegative?-1:1;

        // Determine target: bilanço (codes < 600) or gelir tablosu (codes >= 600)
        const numericTms=parseInt(tmsCode.replace(/[^0-9]/g,''));
        const isGelir=numericTms>=600||rule.section==='GELIR';
        const targetMap=isGelir?newGelirValues:newTmsValues;

        // Clean tmsCode (take first code if range like "110-118" → "110")
        const cleanCode=tmsCode.includes('-')?tmsCode.split('-')[0].trim():tmsCode.trim();

        // Add values for each period
        values.forEach((val,pi)=>{
          const yearKey=periodLabels[pi]||`${2024-pi}`;
          if(!targetMap[cleanCode]) targetMap[cleanCode]={};
          targetMap[cleanCode][yearKey]=(targetMap[cleanCode][yearKey]||0)+(val*sign);
        });

        mappedCount++;
        mappingLog.push({bdrCode,bdrName:name,tmsCode:cleanCode,section:rule.section,values});
      });

      setProcessingStep('TMS hesap planına aktarılıyor...');
      await new Promise(r=>setTimeout(r,300));

      // --- UPDATE STATE: Merge new values into existing tmsValues/gelirValues ---
      setTmsValues(prev=>{
        const next={...prev};
        Object.entries(newTmsValues).forEach(([code,yearVals])=>{
          if(!next[code]) next[code]={};
          Object.entries(yearVals).forEach(([yr,val])=>{
            next[code]={...next[code],[yr]:val};
          });
        });
        return next;
      });

      setGelirValues(prev=>{
        const next={...prev};
        Object.entries(newGelirValues).forEach(([code,yearVals])=>{
          if(!next[code]) next[code]={};
          Object.entries(yearVals).forEach(([yr,val])=>{
            next[code]={...next[code],[yr]:val};
          });
        });
        return next;
      });

      setProcessingStep('Doğrulama yapılıyor...');
      await new Promise(r=>setTimeout(r,200));

      // Build result summary
      const result={
        fileName:file.name,
        sheetUsed:sheetName,
        firmName,
        format:isBDR?'BDR Şablonu':'Mizan',
        periods:periodLabels,
        totalExtracted:totalRows,
        mapped:mappedCount,
        unmapped:unmappedCodes,
        tmsUpdated:Object.keys(newTmsValues).length,
        gelirUpdated:Object.keys(newGelirValues).length,
        log:mappingLog,
        sheetsAvailable:wb.SheetNames,
      };

      setUploadResult(result);
      setFiles(p=>[...p,{
        name:file.name,size:file.size,
        date:new Date().toISOString().split('T')[0],
        status:'İşlendi',period:periodLabels.join(' / '),
        mapped:mappedCount,
      }]);
      setProcessing(false);setProcessingStep('');
      setToast(`${mappedCount} kalem TMS'ye eşleştirildi, ${Object.keys(newTmsValues).length+Object.keys(newGelirValues).length} hesap güncellendi`);

    }catch(err){
      console.error('Upload error:',err);
      setProcessing(false);setProcessingStep('');
      setToast('Dosya işlenirken hata: '+err.message);
    }
    // Reset file input
    if(fileRef.current) fileRef.current.value='';
  };

  const handleTmsSave=useCallback((code,year,nv)=>{setTmsValues(p=>({...p,[code]:{...p[code],[year]:nv}}));setToast(`${code} güncellendi`);},[]);
  const handleGelirSave=useCallback((code,year,nv)=>{setGelirValues(p=>({...p,[code]:{...p[code],[year]:nv}}));setToast(`${code} güncellendi`);},[]);
  const getTmsGroupTotal=(gk,y)=>calcGroupTotal(gk,tmsValues,y);

  const exportToExcel=async()=>{
    try{
      const XLSX=await import('xlsx');const wb=XLSX.utils.book_new();const oy=tmsYear==='2024'?'2023':'2022';
      // Bilanço
      const br=[['TMS HESAP PLANI - BİLANÇO','',tmsYear,oy],['Hesap Kodu','Hesap Adı',`31 Ara ${tmsYear}`,`31 Ara ${oy}`]];
      TMS_BILANCO.forEach(s=>{if(s.isGroup){br.push([s.code,s.title,getTmsGroupTotal(s.groupKey,tmsYear)||'',getTmsGroupTotal(s.groupKey,oy)||'']);}else{br.push([s.code,`  ${s.title}`,tmsValues[s.code]?.[tmsYear]||'',tmsValues[s.code]?.[oy]||'']);}});
      const ws1=XLSX.utils.aoa_to_sheet(br);ws1['!cols']=[{wch:12},{wch:55},{wch:20},{wch:20}];XLSX.utils.book_append_sheet(wb,ws1,'Bilanço');
      // Gelir
      const gr=[['TMS HESAP PLANI - GELİR TABLOSU','',tmsYear,oy],['Hesap Kodu','Hesap Adı',`1 Oca-31 Ara ${tmsYear}`,`1 Oca-31 Ara ${oy}`]];
      TMS_GELIR.forEach(s=>{if(s.isGroup&&['faaliyet_kar','olagan_kar','donem_kar','net_kar'].includes(s.groupKey)){gr.push([s.code,s.title,computeGelirTotal(s.groupKey,gelirValues,tmsYear),computeGelirTotal(s.groupKey,gelirValues,oy)]);}else if(s.isGroup){const cs=GELIR_GROUP_CODES[s.groupKey]||[];gr.push([s.code,s.title,cs.reduce((a,c)=>a+(gelirValues[c]?.[tmsYear]||0),0)||'',cs.reduce((a,c)=>a+(gelirValues[c]?.[oy]||0),0)||'']);}else{gr.push([s.code,`  ${s.title}`,gelirValues[s.code]?.[tmsYear]||'',gelirValues[s.code]?.[oy]||'']);}});
      const ws2=XLSX.utils.aoa_to_sheet(gr);ws2['!cols']=[{wch:12},{wch:55},{wch:20},{wch:20}];XLSX.utils.book_append_sheet(wb,ws2,'Gelir Tablosu');
      // Mapping
      const mr=[['BDR → TMS MAPPING KURALLARI','','','','',''],['BDR Kodu','BDR Kalem Adı','TMS Hesap','Bölüm','İşaret','Not']];
      customMappings.forEach(m=>{mr.push([m.bdrCode,m.bdrName,m.tmsCode,BDR_SECTIONS[m.section]||'',m.isNegative?'(-)':'(+)',m.tmsNote||'']);});
      const ws3=XLSX.utils.aoa_to_sheet(mr);ws3['!cols']=[{wch:10},{wch:55},{wch:15},{wch:25},{wch:8},{wch:40}];XLSX.utils.book_append_sheet(wb,ws3,'Mapping Kuralları');
      XLSX.writeFile(wb,`EYHO_TMS_Mali_Veriler_${tmsYear}.xlsx`);setToast('Excel indirildi (Mapping dahil)');
    }catch(err){console.error(err);setToast('Excel export hatası');}
  };

  const tabs=[
    {id:'overview',label:'Genel Bakış',icon:PATHS.home},
    {id:'mapping',label:'Mapping Kuralları',icon:EXTRA_PATHS.layers},
    {id:'tms',label:'TMS Hesap Planı',icon:PATHS.save},
    {id:'balance',label:'Bilanço',icon:PATHS.table},
    {id:'income',label:'Gelir Tablosu',icon:PATHS.chart},
    {id:'cashflow',label:'Nakit Akış',icon:PATHS.trend},
    {id:'company',label:'Şirket Bilgileri',icon:PATHS.building},
    {id:'upload',label:'Dosya Yükle',icon:PATHS.upload},
  ];
  const gr=['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ec4899','#14b8a6'];

  return(
    <div style={{minHeight:'100vh',background:'#080c14'}}>
      {/* HEADER */}
      <header style={{background:'rgba(15,23,42,0.92)',borderBottom:'1px solid rgba(148,163,184,0.08)',padding:'0 24px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between',backdropFilter:'blur(20px)',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#3b82f6,#10b981)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon path={PATHS.chart} size={15} color="#fff"/></div>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:800,color:'#f1f5f9'}}>FinData<span style={{color:'#3b82f6'}}>Pro</span></span>
          <span style={{fontSize:8,color:'#3b82f6',background:'rgba(59,130,246,0.1)',padding:'2px 7px',borderRadius:4,fontWeight:600}}>{user.plan}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {editCount>0&&<><button onClick={handleSaveAll} style={{display:'flex',alignItems:'center',gap:5,background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.3)',borderRadius:7,padding:'5px 12px',color:'#10b981',fontSize:10,fontWeight:600,cursor:'pointer'}}><Icon path={PATHS.save} size={12} color="#10b981"/> {editCount} kaydet</button><button onClick={handleReset} style={{display:'flex',alignItems:'center',gap:5,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:7,padding:'5px 12px',color:'#ef4444',fontSize:10,fontWeight:600,cursor:'pointer'}}><Icon path={PATHS.undo} size={12} color="#ef4444"/> Geri al</button></>}
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#3b82f6,#6366f1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#fff'}}>{user.name.charAt(0)}</div>
            <div><div style={{fontSize:11,fontWeight:600,color:'#e2e8f0'}}>{user.name}</div><div style={{fontSize:8,color:'#64748b'}}>{user.org}</div></div>
          </div>
          <button onClick={onLogout} style={{background:'none',border:'1px solid rgba(148,163,184,0.1)',borderRadius:7,padding:'5px 12px',color:'#94a3b8',fontSize:10,cursor:'pointer'}}>Çıkış</button>
        </div>
      </header>

      <div style={{display:'flex'}}>
        {/* SIDEBAR */}
        <nav style={{width:190,minHeight:'calc(100vh - 56px)',background:'rgba(15,23,42,0.5)',borderRight:'1px solid rgba(59,130,246,0.06)',padding:'18px 8px',position:'sticky',top:56,height:'calc(100vh - 56px)',overflowY:'auto'}}>
          <div style={{fontSize:8,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',padding:'0 10px',marginBottom:8}}>Menü</div>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{width:'100%',padding:'8px 11px',borderRadius:8,border:'none',background:tab===t.id?'rgba(59,130,246,0.12)':'transparent',color:tab===t.id?'#60a5fa':'#94a3b8',display:'flex',alignItems:'center',gap:9,fontSize:11,fontWeight:tab===t.id?600:400,marginBottom:2,textAlign:'left',cursor:'pointer'}}>
              <Icon path={t.icon} size={14}/> {t.label}
              {t.id==='mapping'&&<span style={{marginLeft:'auto',background:'rgba(245,158,11,0.15)',color:'#f59e0b',padding:'1px 5px',borderRadius:3,fontSize:8,fontWeight:700}}>YENİ</span>}
            </button>
          ))}
          <div style={{marginTop:24,padding:12,background:'rgba(59,130,246,0.05)',borderRadius:9,border:'1px solid rgba(59,130,246,0.08)'}}>
            <div style={{fontSize:9,color:'#64748b',fontWeight:600,marginBottom:4}}>Aktif Veri</div>
            <div style={{fontSize:10,color:'#e2e8f0',fontWeight:500}}>ECZYT — 3 Dönem</div>
            <div style={{fontSize:8,color:'#3b82f6',marginTop:2}}>2022 • 2023 • 2024</div>
          </div>
          <div style={{marginTop:12,padding:12,background:'rgba(16,185,129,0.05)',borderRadius:9,border:'1px solid rgba(16,185,129,0.08)'}}>
            <div style={{fontSize:9,color:'#64748b',fontWeight:600,marginBottom:4}}>Mapping</div>
            <div style={{fontSize:10,color:'#10b981',fontWeight:500}}>{customMappings.length} kural</div>
          </div>
        </nav>

        {/* MAIN */}
        <main style={{flex:1,padding:'24px 32px',maxWidth:1120}}>

          {tab==='overview'&&<>
            <div style={{marginBottom:24}}>
              <h1 style={{fontSize:21,fontWeight:700,color:'#f1f5f9',marginBottom:4}}>Eczacıbaşı Yatırım Holding Ortaklığı A.Ş.</h1>
              <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{background:'rgba(59,130,246,0.1)',color:'#60a5fa',padding:'2px 8px',borderRadius:4,fontSize:9,fontWeight:600}}>ECZYT | BIST</span>
                <span style={{background:'rgba(16,185,129,0.1)',color:'#10b981',padding:'2px 8px',borderRadius:4,fontSize:9,fontWeight:600}}>3 Yıllık Karşılaştırmalı</span>
                <span style={{color:'#64748b',fontSize:10}}>TMS 29 Enflasyon Düzeltmeli</span>
              </div>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:26}}>
              <KPICard label="Toplam Varlıklar" value={fmtS(data.bs_total['TOPLAM VARLIKLAR']['2024'])} subtitle="31 Ara 2024" trend={pctChange(data.bs_total['TOPLAM VARLIKLAR']['2024'],data.bs_total['TOPLAM VARLIKLAR']['2023'])}/>
              <KPICard label="Özkaynaklar" value={fmtS(data.bs_eq['Toplam Özkaynaklar']['2024'])} subtitle="Özkaynak" trend={pctChange(data.bs_eq['Toplam Özkaynaklar']['2024'],data.bs_eq['Toplam Özkaynaklar']['2023'])} color="#10b981"/>
              <KPICard label="Net Dönem Karı" value={fmtS(data.income['Net Dönem Karı']['2024'])} subtitle="FY 2024" trend={pctChange(data.income['Net Dönem Karı']['2024'],data.income['Net Dönem Karı']['2023'])} color="#f59e0b"/>
              <KPICard label="Pay Başına Kazanç" value={`₺${data.income['Pay Başına Kazanç (TL)']['2024']}`} subtitle="EPS" trend={pctChange(data.income['Pay Başına Kazanç (TL)']['2024'],data.income['Pay Başına Kazanç (TL)']['2023'])} color="#8b5cf6"/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:26}}>
              {[['Net Kar Trendi',data.income['Net Dönem Karı'],'#3b82f6'],['Toplam Varlıklar',data.bs_total['TOPLAM VARLIKLAR'],'#8b5cf6'],['Dönem Sonu Nakit',data.cashflow['Dönem Sonu Nakit'],'#10b981'],['Esas Faaliyet Karı',data.income['Esas Faaliyet Karı'],'#f59e0b']].map(([t,d,c],i)=>(
                <div key={i} style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
                  <h3 style={{color:'#e2e8f0',fontSize:11,fontWeight:600,marginBottom:12}}>{t}</h3>
                  <BarChart items={YEARS.map(y=>({label:y,value:d[y]}))} color={c}/>
                </div>
              ))}
            </div>
            <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
              <h3 style={{color:'#e2e8f0',fontSize:11,fontWeight:600,marginBottom:12}}>İşlenen Raporlar</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {FILINGS_INFO.map((f,i)=>(
                  <div key={i} style={{padding:14,background:'rgba(30,41,59,0.5)',borderRadius:9,borderLeft:`3px solid ${f.color}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:12,fontWeight:600,color:'#e2e8f0'}}>{f.period}</span><span style={{fontSize:9,color:'#10b981',background:'rgba(16,185,129,0.1)',padding:'1px 6px',borderRadius:3}}>✓ İşlendi</span></div>
                    <div style={{fontSize:10,color:'#94a3b8'}}>Denetçi: <strong style={{color:'#e2e8f0'}}>{f.auditor}</strong></div>
                    <div style={{fontSize:10,color:'#94a3b8'}}>{f.date} • {f.pages} sayfa</div>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {tab==='mapping'&&<MappingEditor mappings={customMappings} onUpdate={setCustomMappings} onToast={setToast}/>}

          {tab==='tms'&&<>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div><h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:3}}>TMS Tekdüzen Hesap Planı</h2><p style={{color:'#64748b',fontSize:11}}>BDR dipnotlarından eşleştirilmiş • <span style={{color:'#f59e0b'}}>Hücrelere tıklayarak düzenleyin</span></p></div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <select value={tmsYear} onChange={e=>setTmsYear(e.target.value)} style={{padding:'6px 12px',borderRadius:7,border:'1px solid rgba(59,130,246,0.2)',background:'rgba(15,23,42,0.8)',color:'#e2e8f0',fontSize:12,outline:'none'}}><option value="2024">2024</option><option value="2023">2023</option></select>
                <button onClick={()=>setTab('mapping')} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:7,border:'1px solid rgba(245,158,11,0.3)',background:'rgba(245,158,11,0.1)',color:'#f59e0b',fontSize:11,fontWeight:600,cursor:'pointer'}}><Icon path={EXTRA_PATHS.layers} size={13} color="#f59e0b"/> Mapping</button>
                <button onClick={exportToExcel} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:7,border:'1px solid rgba(16,185,129,0.3)',background:'rgba(16,185,129,0.1)',color:'#10b981',fontSize:11,fontWeight:600,cursor:'pointer'}}><Icon path={PATHS.download} size={13} color="#10b981"/> Excel İndir</button>
              </div>
            </div>
            {/* Bilanço TMS */}
            <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18,marginBottom:20}}>
              <h3 style={{color:'#e2e8f0',fontSize:14,fontWeight:600,marginBottom:14,display:'flex',alignItems:'center',gap:8}}><Icon path={PATHS.table} size={16} color="#3b82f6"/> Bilanço — {tmsYear}</h3>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr style={{borderBottom:'2px solid rgba(59,130,246,0.12)'}}>
                    <th style={{textAlign:'left',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase',width:80}}>Hesap Kodu</th>
                    <th style={{textAlign:'left',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase'}}>Hesap Adı</th>
                    <th style={{textAlign:'right',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase',width:160}}>31 Ara {tmsYear} (TL)</th>
                    <th style={{textAlign:'left',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase',width:200}}>Dipnot</th>
                  </tr></thead>
                  <tbody>{TMS_BILANCO.map((s,i)=>{const isH=s.isGroup;const val=isH?getTmsGroupTotal(s.groupKey,tmsYear):(tmsValues[s.code]?.[tmsYear]||0);const bg=s.level===0?'rgba(59,130,246,0.06)':s.level===1&&isH?'rgba(59,130,246,0.03)':'transparent';const ind=s.level===2?24:s.level===1?8:0;
                    return(<tr key={i} style={{borderBottom:'1px solid rgba(148,163,184,0.04)',background:bg}}>
                      <td style={{padding:'5px 10px',color:isH?'#60a5fa':'#94a3b8',fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:isH?600:400}}>{s.code}</td>
                      <td style={{padding:'5px 10px',paddingLeft:10+ind,color:isH?'#e2e8f0':'#cbd5e1',fontSize:11,fontWeight:isH||s.isBold?600:400}}>{s.title}</td>
                      <td style={{textAlign:'right',padding:'4px 10px'}}>{isH?<span style={{color:'#e2e8f0',fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600}}>{val?fmtN(val):'—'}</span>:tmsValues[s.code]?<EditableCell value={tmsValues[s.code]?.[tmsYear]||0} onSave={(_,__,nv)=>handleTmsSave(s.code,tmsYear,nv)} year={tmsYear} rowKey={s.code}/>:<span style={{color:'#475569',fontSize:10}}>—</span>}</td>
                      <td style={{padding:'5px 10px',color:'#475569',fontSize:9,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.dipnot||''}</td>
                    </tr>);
                  })}</tbody>
                </table>
              </div>
              {(()=>{const a=getTmsGroupTotal('aktif',tmsYear),p=getTmsGroupTotal('pasif',tmsYear),f=a-p;return(<div style={{marginTop:12,padding:'10px 14px',borderRadius:8,background:f===0?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)',border:`1px solid ${f===0?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:11,color:f===0?'#10b981':'#ef4444',fontWeight:600}}>{f===0?'✓ Aktif = Pasif — Bilanço dengeli':`✗ Fark = ${fmtN(f)}`}</span><span style={{fontSize:10,color:'#64748b'}}>A:{fmtN(a)} | P:{fmtN(p)}</span></div>);})()}
            </div>
            {/* Gelir TMS */}
            <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
              <h3 style={{color:'#e2e8f0',fontSize:14,fontWeight:600,marginBottom:14,display:'flex',alignItems:'center',gap:8}}><Icon path={PATHS.chart} size={16} color="#10b981"/> Gelir Tablosu — {tmsYear}</h3>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr style={{borderBottom:'2px solid rgba(16,185,129,0.12)'}}>
                    <th style={{textAlign:'left',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase',width:80}}>Hesap Kodu</th>
                    <th style={{textAlign:'left',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase'}}>Hesap Adı</th>
                    <th style={{textAlign:'right',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase',width:160}}>1 Oca-31 Ara {tmsYear} (TL)</th>
                    <th style={{textAlign:'left',padding:'6px 10px',color:'#64748b',fontWeight:600,fontSize:9,textTransform:'uppercase',width:200}}>Dipnot</th>
                  </tr></thead>
                  <tbody>{TMS_GELIR.map((s,i)=>{let val=0;if(s.isGroup&&['faaliyet_kar','olagan_kar','donem_kar','net_kar'].includes(s.groupKey)){val=computeGelirTotal(s.groupKey,gelirValues,tmsYear);}else if(s.isGroup){val=(GELIR_GROUP_CODES[s.groupKey]||[]).reduce((a,c)=>a+(gelirValues[c]?.[tmsYear]||0),0);}else{val=gelirValues[s.code]?.[tmsYear]||0;}const bg=s.isGroup?'rgba(16,185,129,0.04)':'transparent';
                    return(<tr key={i} style={{borderBottom:'1px solid rgba(148,163,184,0.04)',background:bg}}>
                      <td style={{padding:'5px 10px',color:s.isHeader?'#10b981':'#94a3b8',fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:s.isHeader?600:400}}>{s.code}</td>
                      <td style={{padding:'5px 10px',color:s.isHeader?'#e2e8f0':'#cbd5e1',fontSize:11,fontWeight:s.isHeader||s.isBold?600:400}}>{s.title}</td>
                      <td style={{textAlign:'right',padding:'4px 10px'}}>{s.isHeader?<span style={{color:val<0?'#ef4444':'#e2e8f0',fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600}}>{fmtN(val)}</span>:gelirValues[s.code]?<EditableCell value={gelirValues[s.code]?.[tmsYear]||0} onSave={(_,__,nv)=>handleGelirSave(s.code,tmsYear,nv)} year={tmsYear} rowKey={s.code}/>:<span style={{color:'#475569',fontSize:10}}>—</span>}</td>
                      <td style={{padding:'5px 10px',color:'#475569',fontSize:9}}>{s.dipnot||''}</td>
                    </tr>);
                  })}</tbody>
                </table>
              </div>
            </div>
            <ValidationPanel tmsValues={tmsValues} gelirValues={gelirValues} tmsYear={tmsYear}/>
          </>}

          {tab==='balance'&&<>
            <h2 style={{fontSize:18,fontWeight:700,marginBottom:3,color:'#f1f5f9'}}>Finansal Durum Tablosu</h2>
            <p style={{color:'#64748b',fontSize:11,marginBottom:18}}>31 Aralık 2022-2024 • TMS 29 düzeltmeli • <span style={{color:'#f59e0b'}}>Hücrelere tıklayarak düzenleyin</span></p>
            <DataTable title="Dönen Varlıklar" sectionKey="bs_current" data={data} onCellSave={handleCellSave} accent="#3b82f6"/>
            <DataTable title="Duran Varlıklar" sectionKey="bs_noncurrent" data={data} onCellSave={handleCellSave} accent="#8b5cf6"/>
            <DataTable title="Toplam Varlıklar" sectionKey="bs_total" data={data} onCellSave={handleCellSave} accent="#f59e0b"/>
            <DataTable title="Kısa Vadeli Yükümlülükler" sectionKey="bs_cl" data={data} onCellSave={handleCellSave} accent="#ef4444"/>
            <DataTable title="Uzun Vadeli Yükümlülükler" sectionKey="bs_ncl" data={data} onCellSave={handleCellSave} accent="#f97316"/>
            <DataTable title="Özkaynaklar" sectionKey="bs_eq" data={data} onCellSave={handleCellSave} accent="#10b981"/>
          </>}

          {tab==='income'&&<>
            <h2 style={{fontSize:18,fontWeight:700,marginBottom:3,color:'#f1f5f9'}}>Kar veya Zarar Tablosu</h2>
            <p style={{color:'#64748b',fontSize:11,marginBottom:18}}>2022-2024 • <span style={{color:'#f59e0b'}}>Hücrelere tıklayarak düzenleyin</span></p>
            <DataTable title="Gelir Tablosu" sectionKey="income" data={data} onCellSave={handleCellSave} accent="#3b82f6"/>
            <DataTable title="Kapsamlı Gelir" sectionKey="comprehensive" data={data} onCellSave={handleCellSave} accent="#10b981"/>
          </>}

          {tab==='cashflow'&&<>
            <h2 style={{fontSize:18,fontWeight:700,marginBottom:3,color:'#f1f5f9'}}>Nakit Akış Tablosu</h2>
            <p style={{color:'#64748b',fontSize:11,marginBottom:18}}>2022-2024 • <span style={{color:'#f59e0b'}}>Hücrelere tıklayarak düzenleyin</span></p>
            <DataTable title="Nakit Akışları" sectionKey="cashflow" data={data} onCellSave={handleCellSave} accent="#10b981"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginTop:22}}>
              {YEARS.map((y,i)=>(
                <div key={y} style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:16}}>
                  <h4 style={{color:'#e2e8f0',fontSize:11,fontWeight:600,marginBottom:10}}>{y}</h4>
                  <BarChart items={[{label:'İşlt',value:data.cashflow['İşletme Faal. Nakit'][y]},{label:'Yat',value:data.cashflow['Yatırım Faal. Nakit'][y]},{label:'Fin',value:data.cashflow['Finansman Faal. Nakit'][y]}]} width={160} height={65} color={gr[i]}/>
                </div>
              ))}
            </div>
          </>}

          {tab==='company'&&<>
            <h2 style={{fontSize:18,fontWeight:700,marginBottom:18,color:'#f1f5f9'}}>Şirket Bilgileri</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
                <h3 style={{color:'#e2e8f0',fontSize:12,fontWeight:600,marginBottom:10}}>Genel Bilgiler</h3>
                {COMPANY_INFO.map(([l,v],i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(148,163,184,0.04)'}}><span style={{color:'#64748b',fontSize:10}}>{l}</span><span style={{color:'#e2e8f0',fontSize:10,fontWeight:500,textAlign:'right',maxWidth:'55%'}}>{v}</span></div>))}
              </div>
              <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
                <h3 style={{color:'#e2e8f0',fontSize:12,fontWeight:600,marginBottom:10}}>Yönetim Kurulu</h3>
                {BOARD_MEMBERS.map((m,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:9,padding:'6px 0',borderBottom:'1px solid rgba(148,163,184,0.04)'}}><div style={{width:30,height:30,borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',background:`linear-gradient(135deg,${gr[i]},${gr[(i+3)%6]})`,color:'#fff',fontSize:11,fontWeight:700}}>{m.name.charAt(0)}</div><div><div style={{fontSize:11,color:'#e2e8f0',fontWeight:500}}>{m.name}</div><div style={{fontSize:9,color:'#64748b'}}>{m.role}</div></div></div>))}
              </div>
            </div>
          </>}

          {tab==='upload'&&<>
            <h2 style={{fontSize:18,fontWeight:700,marginBottom:3,color:'#f1f5f9'}}>Dosya Yükleme & İşleme</h2>
            <p style={{color:'#64748b',fontSize:11,marginBottom:18}}>BDR şablonu (.xlsx) yükleyin — otomatik TMS mapping ve veri aktarımı</p>
            <div onClick={()=>fileRef.current?.click()} style={{border:'2px dashed rgba(59,130,246,0.3)',borderRadius:16,padding:'44px 32px',textAlign:'center',cursor:'pointer',background:'rgba(59,130,246,0.02)',marginBottom:24,transition:'border-color 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.3)'}>
              <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleUpload} style={{display:'none'}}/>
              <div style={{width:52,height:52,borderRadius:13,background:'rgba(59,130,246,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><Icon path={PATHS.upload} size={24} color="#60a5fa"/></div>
              {processing?<>
                <div style={{color:'#60a5fa',fontSize:14,fontWeight:600,marginBottom:6}}>{processingStep||'İşleniyor...'}</div>
                <div style={{width:240,height:4,background:'rgba(59,130,246,0.15)',borderRadius:2,margin:'0 auto',overflow:'hidden'}}><div className="pulse" style={{width:'70%',height:'100%',background:'#3b82f6',borderRadius:2}}/></div>
                <p style={{color:'#64748b',fontSize:10,marginTop:10}}>Excel okuma → BDR ayrıştırma → Mapping → TMS aktarım → Doğrulama</p>
              </>:<>
                <div style={{color:'#e2e8f0',fontSize:14,fontWeight:600,marginBottom:6}}>BDR Excel dosyanızı sürükleyin veya tıklayın</div>
                <p style={{color:'#64748b',fontSize:12}}>BDR Şablonu (.xlsx) • Mizan dosyaları da desteklenir</p>
              </>}
            </div>

            {/* Upload Result Summary */}
            {uploadResult&&<div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:12,padding:18,marginBottom:24}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <h3 style={{color:'#e2e8f0',fontSize:14,fontWeight:600,display:'flex',alignItems:'center',gap:8}}>
                  <Icon path={PATHS.check} size={16} color="#10b981"/> İşlem Sonucu
                </h3>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={()=>setTab('tms')} style={{padding:'5px 12px',borderRadius:6,border:'1px solid rgba(59,130,246,0.3)',background:'rgba(59,130,246,0.1)',color:'#60a5fa',fontSize:10,fontWeight:600,cursor:'pointer'}}>TMS'de Görüntüle →</button>
                  <button onClick={()=>setTab('mapping')} style={{padding:'5px 12px',borderRadius:6,border:'1px solid rgba(245,158,11,0.3)',background:'rgba(245,158,11,0.1)',color:'#f59e0b',fontSize:10,fontWeight:600,cursor:'pointer'}}>Mapping Kontrol →</button>
                </div>
              </div>

              {/* Summary Cards */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
                {[
                  {l:'Dosya',v:uploadResult.fileName,c:'#3b82f6'},
                  {l:'Format',v:uploadResult.format,c:'#8b5cf6'},
                  {l:'Okunan Kalem',v:uploadResult.totalExtracted,c:'#f59e0b'},
                  {l:'Eşleştirilen',v:uploadResult.mapped,c:'#10b981'},
                ].map((c,i)=>(
                  <div key={i} style={{background:`${c.c}08`,border:`1px solid ${c.c}20`,borderRadius:8,padding:'8px 12px'}}>
                    <div style={{color:'#64748b',fontSize:8,fontWeight:600,textTransform:'uppercase'}}>{c.l}</div>
                    <div style={{color:c.c,fontSize:c.l==='Dosya'?10:16,fontWeight:700,fontFamily:typeof c.v==='number'?"'DM Mono',monospace":'inherit',marginTop:2,wordBreak:'break-all'}}>{c.v}</div>
                  </div>
                ))}
              </div>

              {/* Updated accounts */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                <div style={{background:'rgba(59,130,246,0.06)',borderRadius:8,padding:'8px 12px',border:'1px solid rgba(59,130,246,0.1)'}}>
                  <span style={{color:'#64748b',fontSize:9}}>Bilanço hesapları güncellendi: </span>
                  <span style={{color:'#60a5fa',fontSize:12,fontWeight:700}}>{uploadResult.tmsUpdated}</span>
                </div>
                <div style={{background:'rgba(16,185,129,0.06)',borderRadius:8,padding:'8px 12px',border:'1px solid rgba(16,185,129,0.1)'}}>
                  <span style={{color:'#64748b',fontSize:9}}>Gelir tablosu hesapları güncellendi: </span>
                  <span style={{color:'#10b981',fontSize:12,fontWeight:700}}>{uploadResult.gelirUpdated}</span>
                </div>
              </div>

              {/* Mapping Log - collapsible */}
              {uploadResult.log.length>0&&<details style={{marginBottom:10}}>
                <summary style={{color:'#94a3b8',fontSize:10,cursor:'pointer',padding:'4px 0',fontWeight:600}}>📋 Eşleştirme detayları ({uploadResult.log.length} kalem)</summary>
                <div style={{maxHeight:200,overflowY:'auto',marginTop:8}}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr style={{borderBottom:'1px solid rgba(148,163,184,0.1)'}}>
                      <th style={{textAlign:'left',padding:'3px 6px',color:'#475569',fontSize:8}}>BDR</th>
                      <th style={{textAlign:'left',padding:'3px 6px',color:'#475569',fontSize:8}}>Kalem</th>
                      <th style={{textAlign:'center',padding:'3px 6px',color:'#475569',fontSize:8}}>→</th>
                      <th style={{textAlign:'left',padding:'3px 6px',color:'#475569',fontSize:8}}>TMS</th>
                      <th style={{textAlign:'right',padding:'3px 6px',color:'#475569',fontSize:8}}>Tutar</th>
                    </tr></thead>
                    <tbody>{uploadResult.log.map((l,i)=>(
                      <tr key={i} style={{borderBottom:'1px solid rgba(148,163,184,0.03)'}}>
                        <td style={{padding:'2px 6px',color:'#60a5fa',fontSize:9,fontFamily:"'DM Mono',monospace"}}>{l.bdrCode}</td>
                        <td style={{padding:'2px 6px',color:'#cbd5e1',fontSize:9,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.bdrName}</td>
                        <td style={{padding:'2px 6px',color:'#475569',fontSize:9,textAlign:'center'}}>→</td>
                        <td style={{padding:'2px 6px',color:'#10b981',fontSize:9,fontFamily:"'DM Mono',monospace",fontWeight:600}}>{l.tmsCode}</td>
                        <td style={{padding:'2px 6px',color:'#e2e8f0',fontSize:9,fontFamily:"'DM Mono',monospace",textAlign:'right'}}>{fmtN(l.values[0])}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </details>}

              {/* Unmapped items */}
              {uploadResult.unmapped.length>0&&<details>
                <summary style={{color:'#fca5a5',fontSize:10,cursor:'pointer',padding:'4px 0',fontWeight:600}}>⚠ Eşleştirilemeyen kalemler ({uploadResult.unmapped.length})</summary>
                <div style={{maxHeight:150,overflowY:'auto',marginTop:8,background:'rgba(239,68,68,0.04)',borderRadius:8,padding:8}}>
                  {uploadResult.unmapped.map((u,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'3px 4px',borderBottom:'1px solid rgba(239,68,68,0.06)'}}>
                      <span style={{color:'#f87171',fontSize:9,fontFamily:"'DM Mono',monospace"}}>{u.code}</span>
                      <span style={{color:'#94a3b8',fontSize:9,flex:1,marginLeft:8}}>{u.name}</span>
                      {u.note&&<span style={{color:'#f59e0b',fontSize:8}}>{u.note}</span>}
                    </div>
                  ))}
                </div>
              </details>}

              {uploadResult.firmName&&<div style={{marginTop:10,color:'#475569',fontSize:9}}>Firma: <strong style={{color:'#94a3b8'}}>{uploadResult.firmName}</strong> • Sheet: {uploadResult.sheetUsed} • Tüm sheetler: {uploadResult.sheetsAvailable.join(', ')}</div>}
            </div>}

            {/* File List */}
            {files.length>0&&<div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18,marginBottom:24}}>
              <h3 style={{color:'#e2e8f0',fontSize:12,fontWeight:600,marginBottom:10}}>İşlenen Dosyalar</h3>
              {files.map((f,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:'1px solid rgba(148,163,184,0.04)'}}>
                <div style={{width:30,height:30,borderRadius:7,background:f.name.endsWith('.pdf')?'rgba(239,68,68,0.1)':'rgba(16,185,129,0.1)',display:'flex',alignItems:'center',justifyContent:'center',color:f.name.endsWith('.pdf')?'#f87171':'#10b981'}}><Icon path={PATHS.file} size={13}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:'#e2e8f0',fontWeight:500}}>{f.name}</div>
                  <div style={{fontSize:9,color:'#64748b'}}>{(f.size/1e6).toFixed(1)} MB • {f.date} • {f.period}{f.mapped?` • ${f.mapped} kalem eşleştirildi`:''}</div>
                </div>
                <span style={{background:'rgba(16,185,129,0.1)',color:'#10b981',padding:'2px 7px',borderRadius:4,fontSize:9,fontWeight:600}}>✓ {f.status}</span>
              </div>))}
            </div>}

            {/* Pipeline */}
            <div style={{background:'rgba(15,23,42,0.6)',border:'1px solid rgba(148,163,184,0.08)',borderRadius:12,padding:18}}>
              <h3 style={{color:'#e2e8f0',fontSize:12,fontWeight:600,marginBottom:12}}>Veri İşleme Pipeline</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
                {[{s:1,t:'Excel Parse',d:'Sheet & tablo tespiti',c:'#3b82f6'},{s:2,t:'BDR Extract',d:'Hesap kodu-tutar çıkartma',c:'#8b5cf6'},{s:3,t:'TMS Map',d:'Mapping kurallarıyla eşleştirme',c:'#10b981'},{s:4,t:'Aktarım',d:'TMS hesap planına yazma',c:'#f59e0b'},{s:5,t:'Doğrulama',d:'Toplam tutarlılık kontrolü',c:'#ec4899'}].map(x=>(<div key={x.s} style={{padding:12,background:'rgba(30,41,59,0.5)',borderRadius:8,borderTop:`3px solid ${x.c}`}}><div style={{width:22,height:22,borderRadius:5,background:`${x.c}22`,color:x.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,marginBottom:6}}>{x.s}</div><div style={{color:'#e2e8f0',fontSize:10,fontWeight:600,marginBottom:2}}>{x.t}</div><div style={{color:'#64748b',fontSize:8}}>{x.d}</div></div>))}
              </div>
            </div>
          </>}

        </main>
      </div>
      {toast&&<Toast message={toast} onClose={()=>setToast(null)}/>}
    </div>
  );
}

// ═══ APP ═══
export default function App(){
  const [user,setUser]=useState(null);
  return user?<Dashboard user={user} onLogout={()=>setUser(null)}/>:<LoginScreen onLogin={setUser}/>;
}
