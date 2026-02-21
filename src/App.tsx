/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Menu, 
  X,
  Droplets,
  Wind,
  Thermometer,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SERVICES = [
  {
    title: 'Ilmalämpöpumput',
    description: 'Asennus, huolto ja myynti. Säästä energiaa ja paranna asumismukavuutta.',
    icon: Thermometer,
    color: 'bg-blue-50 text-blue-600',
    tags: ['Asennus', 'Huoltopesu', 'Vianhaku']
  },
  {
    title: 'Ilmanvaihto',
    description: 'Puhdistus, säätö ja huolto. Puhdas sisäilma on terveyden perusta.',
    icon: Wind,
    color: 'bg-emerald-50 text-emerald-600',
    tags: ['Puhdistus', 'Säätö', 'Suodattimet']
  },
  {
    title: 'Putkityöt & LVI',
    description: 'Kaikki kodin putkityöt hanan vaihdosta suurempiin urakoihin.',
    icon: Droplets,
    color: 'bg-slate-50 text-slate-600',
    tags: ['Hanan vaihto', 'Viemärit', 'Patterit']
  },
  {
    title: 'Päivystys 24/7',
    description: 'Hätätilanteet eivät odota. Olemme paikalla kun tarve on suurin.',
    icon: Clock,
    color: 'bg-red-50 text-red-600',
    tags: ['Vesivahingot', 'Tukokset', 'Vuodot']
  }
];

const REVIEWS = [
  {
    name: 'Marika K.',
    date: 'Viikko sitten',
    rating: 5,
    text: 'Huoltopesu sai varattua nopealla aikataululla ja helposti. Ystävällinen ja asiantunteva palvelu, ja puhdasta tuli!',
    source: 'Google'
  },
  {
    name: 'Lars Strandberg',
    date: '2 viikkoa sitten',
    rating: 5,
    text: 'Timely and good service. Took the time to make recommendations on how to heat up the room efficiently.',
    source: 'Google'
  },
  {
    name: 'Simo Kauppila',
    date: 'Kuukausi sitten',
    rating: 5,
    text: 'Varaus helppo, saapuivat sovittuna aikana, toimenpiteet tehtiin siististi ja viestintä oli hyvää. Suosittelen.',
    source: 'Google'
  }
];

const PRICING = [
  {
    service: 'Ilmalämpöpumpun perushuolto',
    price: '189 €',
    includes: ['Sisäyksikön pesu', 'Ulkoyksikön tarkistus', 'Toiminnan testaus']
  },
  {
    service: 'IV-kanavien puhdistus (omakotitalo)',
    price: 'alk. 390 €',
    includes: ['Kanavien harjaus', 'Koneen puhdistus', 'Ilmamäärien säätö']
  },
  {
    service: 'LVI-asentajan tuntityö',
    price: '78 € / h',
    includes: ['Ammattitaitoinen työ', 'Nykyaikaiset työkalut', 'Raportointi']
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [consumption, setConsumption] = useState(15000);

  const electricityPrice = 0.15; // €/kWh
  const pumpCost = 2200; // Keskimääräinen hinta asennettuna
  const currentCost = consumption * electricityPrice;
  const minSavings = currentCost * 0.4;
  const maxSavings = currentCost * 0.6;
  const avgSavings = (minSavings + maxSavings) / 2;
  const paybackYears = pumpCost / avgSavings;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-brand-blue text-white py-2 px-6 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:+358401234567" className="flex items-center gap-2 text-emerald-400 font-bold hover:text-white transition-colors">
              <Phone size={14} /> 040 123 4567
            </a>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              PÄIVYSTYS 24/7
            </div>
            <a href="mailto:info@puhdasputki.fi" className="hidden lg:flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Mail size={14} /> info@puhdasputki.fi
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> Palvelemme: Espoo, Helsinki, Vantaa
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "glass-nav transition-all duration-300",
        scrolled ? "py-3 shadow-lg" : "py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-brand-accent p-2 rounded-lg text-white">
              <Wrench size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight font-display">
              Puhdas<span className="text-brand-accent">Putki</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#palvelut" className="font-medium hover:text-brand-accent transition-colors">Palvelut</a>
            <a href="#hinnasto" className="font-medium hover:text-brand-accent transition-colors">Hinnasto</a>
            <a href="#meista" className="font-medium hover:text-brand-accent transition-colors">Meistä</a>
            <a href="#yhteys" className="btn-primary py-2 px-5 text-sm">
              Pyydä tarjous
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a href="#palvelut" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Palvelut</a>
                <a href="#hinnasto" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Hinnasto</a>
                <a href="#meista" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Meistä</a>
                <a href="#yhteys" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full">Ota yhteyttä</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/hvac-service/1920/1080?blur=2" 
              alt="LVI-huolto" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent" />
          </div>

          <div className="section-padding relative z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <div className="flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm w-fit px-4 py-1 rounded-full border border-white/20">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm font-medium">5.0 | 270+ Google-arvostelua</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Ammattitaitoa, jolla on <span className="text-brand-accent">kasvot.</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Putkimies <span className="text-white font-semibold">Helsinki, Espoo & Vantaa</span>. Nopeutta, johon voit luottaa. Hintaa, joka ei yllätä.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#yhteys" className="btn-primary text-lg px-8">
                  Varaa huolto <ArrowRight size={20} />
                </a>
                <a href="#palvelut" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-brand-blue text-lg px-8">
                  Tutustu palveluihin
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="palvelut" className="section-padding">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-3">Palvelumme</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Kattavat LVI-ratkaisut kotiisi</h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Tarjoamme alan uusinta osaamista ja tekniikkaa, jotta kotisi tekniikka toimii moitteettomasti vuoden ympäri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", service.color)}>
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-semibold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Us Section */}
        <section className="bg-slate-50 py-24">
          <div className="section-padding grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/team-work/800/800" 
                  alt="Tiimimme työssä" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-slate-500">Tyytyväisyystakuu</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Seisomme jokaisen asennuksen takana omilla kasvoillamme.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-3">Miksi valita meidät?</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">Uuden sukupolven LVI-osaamista</h3>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Avoimuus ja läpinäkyvyys',
                    desc: 'Tiedät tarkalleen mitä maksat – ei piilokuluja tai yllätyslaskuja. Hinnastomme on julkinen.',
                    icon: CheckCircle2
                  },
                  {
                    title: 'Paikallinen asiantuntija',
                    desc: 'Tunnemme Espoon ja Uudenmaan talot ja niiden tekniikan. Olemme naapurisi, emme vain kasvoton aliurakoitsija.',
                    icon: MapPin
                  },
                  {
                    title: 'Nopea reagointi',
                    desc: 'Vastaamme pyyntöihin 24 tunnissa. Meidät saa kiinni silloin kun tarve on suurin.',
                    icon: Clock
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-accent">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Entrepreneur's Word Section */}
        <section id="meista" className="section-padding grid lg:grid-cols-2 gap-16 items-center border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-3">Yrittäjän sana</h2>
            <h3 className="text-4xl font-bold mb-6">"Haluamme tehdä asiat paremmin"</h3>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Perustimme PuhdasPutken, koska kyllästyimme alan epämääräisiin laskuihin ja siihen, ettei asentajaa saa kiinni hätätilanteessa.
              </p>
              <p>
                Meille jokainen asiakas on naapuri. Seisomme työmme takana omilla kasvoillamme ja varmistamme, että jälki on sellaista, jota kehtaa esitellä.
              </p>
              <div className="pt-6">
                <div className="font-bold text-brand-blue">Antti Asentaja</div>
                <div className="text-sm text-slate-500 italic">Toimitusjohtaja & Perustaja</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/founder/600/400" 
              alt="Yrittäjä Antti" 
              className="rounded-3xl shadow-lg w-full object-cover aspect-[3/2]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand-accent text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm font-medium">Vuoden kokemus</div>
            </div>
          </div>
        </section>

        {/* Savings Calculator Section */}
        <section className="bg-brand-blue text-white py-24 overflow-hidden relative">
          <div className="section-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-emerald-400 font-bold uppercase tracking-widest mb-3">Säästölaskuri</h2>
                <h3 className="text-4xl font-bold mb-6">Paljonko säästäisit ilmalämpöpumpulla?</h3>
                <p className="text-slate-300 text-lg mb-8">
                  Nykyaikainen ilmalämpöpumppu voi laskea lämmityskustannuksiasi jopa 40-60%. Kokeile laskuriamme ja näe arvioitu säästösi.
                </p>
                <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Vuosikulutus (kWh)</label>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-emerald-400">{consumption.toLocaleString('fi-FI')}</span>
                        <span className="text-emerald-400/60 ml-2 font-bold">kWh</span>
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="2000" 
                      max="35000" 
                      step="100" 
                      value={consumption}
                      onChange={(e) => setConsumption(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400" 
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>2 000 kWh</span>
                      <span>35 000 kWh</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nykyinen kulu</div>
                      <div className="text-xl font-bold">{Math.round(currentCost).toLocaleString('fi-FI')} € / vuosi</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Uusi arvioitu kulu</div>
                      <div className="text-xl font-bold text-emerald-400">{Math.round(currentCost - maxSavings).toLocaleString('fi-FI')} - {Math.round(currentCost - minSavings).toLocaleString('fi-FI')} €</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-sm text-slate-400 mb-2 uppercase font-bold tracking-widest">Arvioitu vuosisäästö:</div>
                    <div className="text-5xl font-bold text-emerald-400">
                      {Math.round(minSavings).toLocaleString('fi-FI')} - {Math.round(maxSavings).toLocaleString('fi-FI')} €
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-400/10 rounded-2xl border border-emerald-400/20">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Takaisinmaksuaika</div>
                      <div className="text-2xl font-bold text-white">
                        n. {paybackYears.toFixed(1).replace('.', ',')} vuotta
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 italic">
                        *Laskettu {pumpCost} € hankintahinnalla
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 mt-4 leading-relaxed uppercase font-bold tracking-wider">
                      *Laskelma perustuu 0,15€/kWh hintaan ja 40-60% säästöön lämmityskuluissa.
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://picsum.photos/seed/heatpump/600/600" 
                  alt="Ilmalämpöpumppu" 
                  className="rounded-full border-8 border-white/5 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="hinnasto" className="section-padding">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-3">Hinnasto</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Selkeä ja reilu hinnoittelu</h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Uskomme, että rehellisyys on parasta asiakaspalvelua. Tässä yleisimmät palvelumme ja niiden hinnat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col">
                <h4 className="text-xl font-bold mb-2">{item.service}</h4>
                <div className="text-3xl font-bold text-brand-blue mb-6">{item.price} <span className="text-sm font-normal text-slate-500">sis. alv 25,5%</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {item.includes.map((inc, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <button className="btn-secondary w-full">Varaa tämä palvelu</button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-500 text-white p-2 rounded-lg">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-xl font-bold">Kotitalousvähennys -60%</h4>
              </div>
              <p className="text-slate-600 mb-4">
                Muista hyödyntää kotitalousvähennys työn osuudesta! Vuonna 2026 voit vähentää jopa 60 % työn hinnasta verotuksessasi.
              </p>
              <a href="https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot-ja-vahennykset/kotitalousvahennys/" target="_blank" className="text-emerald-600 font-bold hover:underline flex items-center gap-2">
                Lue lisää Verohallinnon sivuilta <ChevronRight size={16} />
              </a>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h4 className="text-xl font-bold mb-4">Muut veloitukset</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex justify-between"><span>Huoltoautomaksu (sis. 20km)</span> <span className="font-bold">45 €</span></li>
                <li className="flex justify-between"><span>Pientarvikelisä</span> <span className="font-bold">15 €</span></li>
                <li className="flex justify-between"><span>Minimiveloitus</span> <span className="font-bold">2 h</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-24 border-t border-slate-100">
          <div className="section-padding">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-3">Usein kysyttyä</h2>
              <h3 className="text-4xl font-bold">Asiantuntijan vastaukset</h3>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "Mitä tehdä, jos putki vuotaa?",
                  a: "Sulje välittömästi asunnon päävesihana. Jos kyseessä on kerrostalo, ota yhteys huoltoyhtiöön. Soita sitten päivystysnumeroomme 040 123 4567 – olemme paikalla nopeasti."
                },
                {
                  q: "Kuinka usein ilmalämpöpumppu tulisi huoltaa?",
                  a: "Suosittelemme ammattilaishuoltoa 2-3 vuoden välein. Suodattimet kannattaa kuitenkin imuroida itse vähintään kerran kuukaudessa parhaan hyödyn varmistamiseksi."
                },
                {
                  q: "Miten kotitalousvähennys haetaan?",
                  a: "Me toimitamme sinulle laskun, jossa työn osuus on eritelty selkeästi. Voit ilmoittaa nämä tiedot suoraan OmaVero-palvelussa."
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-3">
                    <span className="text-brand-accent">Q:</span> {faq.q}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    <span className="font-bold text-brand-blue">A:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-brand-blue text-white py-24">
          <div className="section-padding">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-emerald-400 font-bold uppercase tracking-widest mb-3">Asiakkaiden ääni</h2>
                <h3 className="text-4xl md:text-5xl font-bold">Mitä asiakkaamme sanovat meistä</h3>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="text-right">
                  <div className="text-2xl font-bold">4.9 / 5.0</div>
                  <div className="text-sm text-slate-300">278 Google-arvostelua</div>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-6" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {REVIEWS.map((review, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-xs text-slate-400">{review.date}</div>
                    </div>
                    <div className="text-xs font-bold bg-white/10 px-2 py-1 rounded uppercase tracking-tighter">
                      {review.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="yhteys" className="section-padding">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-16">
                <h3 className="text-4xl font-bold mb-6">Ota yhteyttä</h3>
                <p className="text-slate-600 mb-10 text-lg">
                  Tarvitsetko huoltoa, asennusta tai tarjouksen? Jätä viesti, niin palaamme asiaan viimeistään seuraavana arkipäivänä.
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Nimi</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all" placeholder="Matti Meikäläinen" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Puhelin</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all" placeholder="040 123 4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Sähköposti</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all" placeholder="matti@esimerkki.fi" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Miten voimme auttaa?</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all" placeholder="Kerro lyhyesti tarpeestasi..."></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 text-lg">Lähetä viesti</button>
                </form>
              </div>

              <div className="bg-slate-900 p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-10">Yhteystiedot</h4>
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-accent">
                        <Phone size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Soita meille</div>
                        <div className="text-xl font-bold">040 123 4567</div>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-accent">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Sähköposti</div>
                        <div className="text-xl font-bold">info@puhdasputki.fi</div>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-accent">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Toimipiste</div>
                        <div className="text-xl font-bold">Tekniikantie 12, 02150 Espoo</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-16 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-accent p-2 rounded-lg text-white">
                      <Wrench size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight font-display">
                      Puhdas<span className="text-brand-accent">Putki</span>
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    PuhdasPutki Oy on espoolainen LVI-alan perheyritys, joka panostaa laatuun ja asiakaskokemukseen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-sm">
            © 2026 PuhdasPutki Oy. Kaikki oikeudet pidätetään.
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-brand-accent transition-colors">Tietosuoja</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Toimitusehdot</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Evästeet</a>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all cursor-pointer">
              <span className="font-bold">f</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all cursor-pointer">
              <span className="font-bold">in</span>
            </div>
          </div>
        </div>
        
        {/* Certification Logos */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <ShieldCheck size={24} /> AA-LUOTTOLUOKITUS
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <CheckCircle2 size={24} /> LUOTETTAVA KUMPPANI
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <Wrench size={24} /> LVI-TUOTE JÄSEN
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-400 italic">
            SUOMALAISTA PALVELUA
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <a href="tel:+358401234567" className="btn-primary w-full py-4 shadow-2xl flex items-center justify-center gap-3">
          <Phone size={20} /> Soita heti
        </a>
      </div>
    </div>
  );
}
