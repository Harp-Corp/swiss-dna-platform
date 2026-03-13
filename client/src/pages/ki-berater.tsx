import { useState, useRef, useEffect } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { enhancedRecommendations, reports, resilienceScores, sportSummary, patientInfo } from "@/lib/dna-data";
import { Send, Sparkles, Bot, User } from "lucide-react";

interface ChatMessage {
  id: number;
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

const AI_GREETING = `Hallo ${patientInfo.name.split(" ")[0]}! 👋

Ich bin Ihr persönlicher DNA-Berater. Basierend auf Ihren 5 DNA-Analysen (Diet, Health, Mind, Resilience, Sport) kann ich Ihnen individuelle Empfehlungen geben.

Was möchten Sie wissen? Ich kann Ihnen zu folgenden Themen beraten:

• **Trainingsplan** — Personalisierter Plan basierend auf Ihrem Sport- & Kraft-DNA
• **Ernährung** — Mediterrane Ernährung, angepasst an Ihre Gene
• **Supplemente** — Ihre wichtigsten Nahrungsergänzungsmittel
• **Stressmanagement** — Resilienz-Strategien aus Ihrem DNA-Profil
• **Schlaf** — Optimierung basierend auf Ihrem Chronotyp
• **Entgiftung** — Detox-Strategie für Ihre Enzym-Varianten`;

function generateResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("trainingsplan") || lower.includes("training") || lower.includes("sport") || lower.includes("fitness")) {
    return `**Ihr personalisierter Trainingsplan** 🏋️

Basierend auf Ihrem DNA-Sport-Profil:
• **ACE (DD)**: Starker Kraftvorteil — Sie profitieren überdurchschnittlich von Krafttraining
• **ACTN3 (XX)**: Ausdauertyp — exzellentes Ausdauerpotenzial  
• **PPARGC1A (GG)**: Starker Ausdauer-Impact
• **Regeneration**: Schnell — 3-4 intensive Einheiten/Woche möglich

**Empfohlener Wochenplan:**

| Tag | Training | Dauer |
|-----|----------|-------|
| Mo | Krafttraining Oberkörper + 20 Min HIIT | 60 Min |
| Di | Ausdauer: Laufen/Radfahren Zone 2 | 45 Min |
| Mi | Krafttraining Unterkörper + Core | 60 Min |
| Do | Aktive Erholung: Yoga/Pilates (Prähabilitation wg. COL1A1 GG) | 45 Min |
| Fr | Kraft + Ausdauer Kombination | 60 Min |
| Sa | Längere Ausdauereinheit | 60-90 Min |
| So | Ruhetag oder leichtes Dehnen | - |

**Wichtig:** Mindestens 20 MET-Stunden/Woche wegen FTO (AA). BDNF (CT) wird durch Sport aktiviert — das ist Ihr wichtigster Hebel für mentale Gesundheit.

⚠️ **Koffein** mind. 6h vor Training meiden (CYP1A2: langsamer Stoffwechsel).`;
  }

  if (lower.includes("ernährung") || lower.includes("essen") || lower.includes("diät") || lower.includes("mediterran")) {
    const dietRecs = enhancedRecommendations.filter(r => r.category === "ernährung");
    return `**Ihre DNA-basierte Ernährungsstrategie** 🥗

Ihr optimaler Ernährungstyp: **Mediterrane Ernährung**

**Ihre genetischen Besonderheiten:**
• **FTO (AA)**: Stark erhöhtes Adipositas-Risiko → Kalorienkontrolle wichtig
• **TAS1R2 (AA)**: Starker süsser Zahn → Zucker strikt meiden!
• **FABP2 (GA)**: Erhöhte Fettaufnahme → Gesunde Fette bevorzugen
• **TCF7L2 (CT)**: Fettarme Diät effektiver als KH-arm
• **GSTM1 (Deletion)**: Phase-II fehlt → Kreuzblütler täglich!

**Tagesplan-Beispiel:**

🌅 **Frühstück:** Haferflocken mit Beeren, Walnüssen und Zimt
🌞 **Mittagessen:** Lachs auf Quinoa mit Brokkoli, Olivenöl-Dressing
🍎 **Snack:** Hummus mit Gemüsesticks
🌙 **Abendessen:** Pouletbrust mit Ratatouille, Blumenkohl-Reis

**Unbedingt meiden:**
❌ Verarbeiteter Zucker & gesüsste Getränke
❌ Sonnenblumenöl / Pflanzenöle (pro-inflammatorisch)
❌ Verarbeitete Getreideprodukte
❌ Mehr als 45% Kohlenhydrate

**Täglich einbauen:**
✅ Kreuzblütler (Brokkoli, Blumenkohl, Rosenkohl)
✅ Anti-inflammatorisch: Kurkuma, Ingwer, Beeren
✅ Omega-3-reicher Fisch (2-3x/Woche)
✅ Olivenöl als Hauptfett`;
  }

  if (lower.includes("supplement") || lower.includes("nahrungsergänzung") || lower.includes("vitamine")) {
    const supRecs = enhancedRecommendations.filter(r => r.category === "supplemente");
    return `**Ihre priorisierten Supplemente** 💊

**⚡ HOHE PRIORITÄT:**

1. **Methylfolat 400–800 μg/Tag**
   MTHFR C677T (CT) + MTRR (GG) → Aktive Folatform statt synthetischer Folsäure
   _B-Komplex mit Methylfolat, Methylcobalamin und P5P_

2. **Vitamin D3 4000 IE + K2/Tag**
   VDR Fok1 (TT) → Stark reduzierte Rezeptoraktivität
   _Spiegel alle 3 Monate kontrollieren!_

3. **Omega-3 (EPA/DHA) 2–3g/Tag**
   Entzündungsprofil HOCH → Anti-inflammatorisch essenziell
   _Hochwertiges Fischöl oder Algenöl_

**🔶 MITTLERE PRIORITÄT:**

4. **CoQ10 100mg + Selen 200μg/Tag**
   SOD2 (TC) + CAT (CT) + GPX1 (CT) → Antioxidativer Schutz

5. **Magnesium 400mg/Tag**
   NPY (CT) + Stressachse → Stressreduktion, Schlaf, Muskeln

6. **Curcumin 500mg/Tag**
   BDNF (CT) + Entzündung → Neuroprotektion + Anti-Entzündung

**Einnahme-Timing:**
🌅 Morgens: Methylfolat, CoQ10, Omega-3 (mit Frühstück)
🌙 Abends: Vitamin D3+K2, Magnesium (mit Abendessen)
💡 Curcumin: mit Pfeffer/Fett für Bioverfügbarkeit`;
  }

  if (lower.includes("stress") || lower.includes("resilienz") || lower.includes("angst") || lower.includes("entspannung")) {
    return `**Ihre Stress-Management-Strategie** 🧘

**Ihr Resilienz-Profil:**
${resilienceScores.map(s => `• ${s.area}: **${s.score}** ${s.score === "NIEDRIG" ? "⚠️" : s.score === "MODERAT" ? "🔶" : "✅"}`).join("\n")}

**Genetische Besonderheiten:**
• **NPY (CT)**: Stress kann Ängste/Sorgen auslösen
• **OXTR (AG)**: Erhöhtes Risiko für Stimmungsstörungen bei Stress
• **BDNF (CT)**: Sport ist Ihr wichtigster Resilienz-Aktivator!
• **FKBP5 (CT)**: Stressachse braucht aktive Regulation

**Ihr 5-Punkte-Stressmanagement:**

1. **Vagusnervstimulation** — Kälteexposition (kalte Dusche 30-90 Sek), tiefes Atmen (4-7-8 Methode)
2. **Bewegung** — Tägliche Bewegung aktiviert BDNF und reguliert Cortisol
3. **Natur** — Mind. 15 Min/Tag draussen (reduziert Cortisol nachweislich)
4. **Soziale Kontakte** — Mind. 11 prosoziale Handlungen/Woche (OXTR AG)
5. **Achtsamkeit** — Loving Kindness Meditation fördert Oxytocin

**Supplemente für Resilienz:**
• Magnesium 400mg abends
• Curcumin für BDNF-Aktivierung
• Ashwagandha KSM-66 bei hohem Stress

⚠️ **GABRA2 (CC)**: Hoher Impact auf Suchtverhalten — Alkohol als Stressventil vermeiden!`;
  }

  if (lower.includes("schlaf") || lower.includes("sleep") || lower.includes("müde") || lower.includes("schlafen")) {
    return `**Schlafoptimierung für Ihr DNA-Profil** 😴

**Relevante Gene:**
• **CLOCK (TC)**: Sie sind ein späterer Chronotyp — Ihr Körper will später schlafen
• **CYP1A2 (AC)**: Langsamer Koffeinstoffwechsel — Koffein wirkt bei Ihnen länger

**Empfehlungen:**

🕐 **Timing:**
• Letzte Koffeinquelle spätestens um 14:00 Uhr (6h+ vor Schlaf)
• Feste Schlafenszeit einhalten (auch am Wochenende ±30 Min)
• Als Spättyp: idealerweise 23:00–23:30 ins Bett

📱 **Abendrituale:**
• Blaulichtfilter ab 20:00 Uhr (Brille oder App)
• Bildschirme 30 Min vor Schlaf weglegen
• Schlafzimmer kühl (18–19°C) und komplett dunkel

💊 **Unterstützung:**
• Magnesium 400mg ca. 1h vor Schlaf
• Kein Alkohol als Einschlafhilfe (GABRA2 CC!)

🧘 **Routine:**
• 5 Min Atemübungen (4-7-8) vor dem Schlafen
• Progressive Muskelentspannung bei Einschlafproblemen`;
  }

  if (lower.includes("entgift") || lower.includes("detox") || lower.includes("leber") || lower.includes("giftstoff")) {
    return `**Ihre Entgiftungs-Strategie** 🧹

**Ihr Detox-Profil:**
• **CYP1A1 (CT)**: Phase-I erhöht → Mehr toxische Zwischenprodukte
• **GSTM1 (Deletion)**: Phase-II fehlt komplett → Entgiftung massiv beeinträchtigt!
• **GSTP1 (AA)**: Normal
• **GSTT1 (Insertion)**: Normal
• **NQO1 (CC)**: Normal

⚠️ **Wichtig:** Bei Ihnen ist die Phase-I-Entgiftung erhöht (mehr Zwischenprodukte), aber die Phase-II ist durch GSTM1-Deletion reduziert. Das bedeutet: toxische Metaboliten werden schneller gebildet, aber langsamer ausgeschieden.

**Massnahmen:**

🥦 **Ernährung:**
• Kreuzblütler TÄGLICH (Brokkoli, Blumenkohl, Rosenkohl, Grünkohl)
• Sulforaphan-reiche Brokkolisprossen (stärkste natürliche Phase-II-Induktoren)
• Knoblauch, Zwiebeln, Lauch (schwefelhaltig)
• Grüner Tee (Polyphenole unterstützen Entgiftung)

🏡 **Lebensstil:**
• Bio-Lebensmittel bevorzugen (Pestizidbelastung reduzieren)
• Plastikbehälter meiden — Glas oder Edelstahl verwenden
• Wasserfilter für Trinkwasser
• Regelmässig Saunagänge (Toxinausscheidung über Schweiss)

💧 **Trinken:**
• Mind. 2.5L Wasser/Tag
• Zitronenwasser morgens nüchtern
• Kräutertees: Mariendistel, Löwenzahn`;
  }

  if (lower.includes("koffein") || lower.includes("kaffee") || lower.includes("coffee")) {
    return `**Koffein & Ihr DNA-Profil** ☕

**CYP1A2 (AC)**: Sie sind ein **langsamer Koffein-Metabolisierer**.

Das bedeutet:
• Koffein bleibt deutlich länger in Ihrem System als bei schnellen Metabolisierern
• Kaffee am Nachmittag kann Ihren Schlaf stören (CLOCK TC: Spättyp)
• Mehr als 2-3 Tassen/Tag können Blutdruck erhöhen

**Empfehlung:**
• Max. 2 Kaffee/Tag, beide vor 14:00 Uhr
• Grüner Tee als Alternative (L-Theanin wirkt ausgleichend)
• Kein Koffein als Pre-Workout am Abend
• Entkoffeinierter Kaffee ab Mittag`;
  }

  // Default response
  return `Ich kann Ihnen zu folgenden Themen individuell beraten:

• **Trainingsplan** — Ihr personalisierter Sport-Plan
• **Ernährung** — DNA-basierte Ernährungsstrategie
• **Supplemente** — Priorisierte Nahrungsergänzung
• **Stressmanagement** — Resilienz-Strategien
• **Schlaf** — Chronotyp-optimierte Schlafhygiene
• **Entgiftung** — Detox für Ihre Enzym-Varianten
• **Koffein** — Koffein-Management

Tippen Sie einfach ein Thema ein, z.B. "Trainingsplan" oder "Welche Supplemente brauche ich?"`;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center shrink-0">
        <Bot size={16} className="text-white" />
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-200 shadow-sm">
        <div className="flex gap-1.5 items-center h-5">
          <span className="w-2 h-2 rounded-full bg-[#1B3A6B]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-[#1B3A6B]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-[#1B3A6B]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function formatMarkdown(text: string) {
  // Simple markdown-like rendering
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic with _
    processed = processed.replace(/_(.*?)_/g, '<em>$1</em>');

    // Table rows
    if (processed.startsWith("|") && processed.endsWith("|")) {
      const cells = processed.split("|").filter(Boolean).map(c => c.trim());
      if (cells.every(c => c.match(/^-+$/))) {
        return null; // Skip separator rows
      }
      const isHeader = i > 0 && lines[i + 1]?.includes("---");
      return (
        <div key={i} className={`grid grid-cols-3 gap-2 text-[11px] py-1 ${isHeader ? "font-bold border-b border-gray-200" : ""}`}>
          {cells.map((cell, j) => (
            <span key={j} dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </div>
      );
    }

    // Headers
    if (processed.startsWith("## ")) {
      return <div key={i} className="font-bold text-[#1B3A6B] text-sm mt-2 mb-1" dangerouslySetInnerHTML={{ __html: processed.slice(3) }} />;
    }

    // Bullet points
    if (processed.startsWith("• ") || processed.startsWith("- ")) {
      return <div key={i} className="flex gap-2 ml-1" ><span className="shrink-0">•</span><span dangerouslySetInnerHTML={{ __html: processed.slice(2) }} /></div>;
    }

    // Numbered items
    const numMatch = processed.match(/^(\d+)\.\s/);
    if (numMatch) {
      return <div key={i} className="flex gap-2 ml-1"><span className="shrink-0 font-bold text-[#1B3A6B]">{numMatch[1]}.</span><span dangerouslySetInnerHTML={{ __html: processed.slice(numMatch[0].length) }} /></div>;
    }

    // Warning lines
    if (processed.startsWith("⚠️")) {
      return <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-1 text-amber-800" dangerouslySetInnerHTML={{ __html: processed }} />;
    }

    // Empty lines
    if (processed.trim() === "") {
      return <div key={i} className="h-2" />;
    }

    // Emoji-prefixed items (like ✅, ❌, 🌅, etc.)
    if (processed.match(/^[🌅🌞🍎🌙📱🕐💊🧘💧🥦🏡☕❌✅🔶⚡]/u)) {
      return <div key={i} className="ml-1" dangerouslySetInnerHTML={{ __html: processed }} />;
    }

    return <div key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
  }).filter(Boolean);
}

export default function KiBerater() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "ai", content: AI_GREETING, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: messages.length + 1,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateResponse(trimmed);
      const aiMsg: ChatMessage = {
        id: messages.length + 2,
        role: "ai",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickTopics = [
    { label: "Trainingsplan", query: "Erstelle mir einen Trainingsplan" },
    { label: "Ernährung", query: "Wie soll ich mich ernähren?" },
    { label: "Supplemente", query: "Welche Supplemente brauche ich?" },
    { label: "Stress", query: "Wie manage ich Stress besser?" },
    { label: "Schlaf", query: "Wie optimiere ich meinen Schlaf?" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <PatientSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center">
              <Sparkles size={20} className="text-[#C9A84C]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1B3A6B]" data-testid="text-ki-berater-heading">
                KI-Berater
              </h1>
              <p className="text-xs text-muted-foreground">
                Persönliche DNA-Beratung für {patientInfo.name}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Quick topics - show only if just the greeting */}
        {messages.length === 1 && (
          <div className="shrink-0 bg-white/50 border-b border-gray-100 px-6 py-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] text-muted-foreground self-center mr-1">Schnellthemen:</span>
              {quickTopics.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => {
                    setInput(topic.query);
                    setTimeout(() => {
                      setInput(topic.query);
                      const userMsg: ChatMessage = {
                        id: messages.length + 1,
                        role: "user",
                        content: topic.query,
                        timestamp: new Date(),
                      };
                      setMessages(prev => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const response = generateResponse(topic.query);
                        const aiMsg: ChatMessage = {
                          id: messages.length + 2,
                          role: "ai",
                          content: response,
                          timestamp: new Date(),
                        };
                        setMessages(prev => [...prev, aiMsg]);
                        setIsTyping(false);
                        setInput("");
                      }, 1200 + Math.random() * 800);
                    }, 50);
                  }}
                  className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#1B3A6B] border border-[#1B3A6B]/20 hover:border-[#1B3A6B]/40 hover:bg-[#1B3A6B]/5 transition-colors"
                  data-testid={`quick-topic-${topic.label.toLowerCase()}`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 mb-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              data-testid={`message-${msg.role}-${msg.id}`}
            >
              {/* Avatar */}
              {msg.role === "ai" ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2a5298] flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0">
                  <User size={16} className="text-[#1B3A6B]" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                  msg.role === "ai"
                    ? "bg-white border border-gray-200 shadow-sm rounded-tl-sm text-foreground"
                    : "bg-[#1B3A6B] text-white rounded-tr-sm"
                }`}
              >
                {msg.role === "ai" ? (
                  <div className="space-y-0.5">{formatMarkdown(msg.content)}</div>
                ) : (
                  <p>{msg.content}</p>
                )}
                <div className={`text-[10px] mt-2 ${msg.role === "ai" ? "text-muted-foreground" : "text-white/50"}`}>
                  {msg.timestamp.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3 max-w-4xl">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Stellen Sie Ihre Frage..."
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 focus:border-[#1B3A6B] transition-colors"
              disabled={isTyping}
              data-testid="input-chat"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center hover:bg-[#1B3A6B]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              data-testid="button-send"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            KI-Berater basiert auf Ihren DNA-Analysen. Dies ersetzt keine ärztliche Beratung.
          </p>
        </div>
      </main>
    </div>
  );
}
