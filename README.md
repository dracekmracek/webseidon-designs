# Webseidon.cz - Webové stránky pro malé firmy a živnostníky

![Webseidon Logo](public/logo.png)

## O projektu

Webseidon.cz je moderní webová stránka zaměřená na tvorbu webových stránek a digitální řešení pro malé firmy a živnostníky. Projekt je inspirován řeckým bohem moří Poseidonem a kombinuje tematické prvky moře, vln a trojzubce s moderním "hackerským" designem, který vytváří zajímavou a jedinečnou vizuální identitu.

### Klíčové vlastnosti

- **Oceánsko-hackerský design**: Kombinace tmavého pozadí s modrými odstíny oceánu a hackerskou estetikou
- **Animace vodních vln**: Plynulé animace vln oddělující jednotlivé sekce webu
- **Interaktivní efekty**: Animované kapičky vody, matrix efekt v pozadí, terminálový styl textů
- **Responzivní layout**: Plně responzivní design pro všechna zařízení
- **Optimalizovaný výkon**: Rychlé načítání a plynulé animace

## Technologie

Projekt využívá následující technologie:

- **Frontend framework**: React.js s TypeScript
- **Vite**: Jako build nástroj pro rychlý vývoj
- **Tailwind CSS**: Pro styly a responsivní design
- **Shadcn UI**: Pro konzistentní komponentní systém
- **React Router**: Pro navigaci mezi stránkami
- **React Query**: Pro správu stavu a fetching dat
- **Canvas API**: Pro pokročilé vizuální efekty (matrix déšť)

## Struktura projektu

```
webseidon-designs/
├── public/             # Statické soubory (obrázky, ikony)
├── src/                # Zdrojový kód
│   ├── components/     # React komponenty
│   │   ├── ui/         # Základní UI komponenty (Shadcn)
│   │   ├── Hero.tsx    # Úvodní sekce
│   │   ├── About.tsx   # Sekce O nás
│   │   ├── ...         # Další sekční komponenty
│   │   └── WaveAnimation.tsx  # Komponenta pro vlnovou animaci
│   ├── lib/            # Pomocné funkce a utility
│   ├── hooks/          # React hooks
│   ├── pages/          # Stránky aplikace
│   ├── App.tsx         # Hlavní komponent aplikace
│   └── main.tsx        # Vstupní bod aplikace
├── tailwind.config.ts  # Konfigurace Tailwind CSS
└── vite.config.ts      # Konfigurace Vite
```

## Funkcionality

### Vlnová animace

Klíčovým vizuálním prvkem je animace vln mezi sekcemi. Každá vlna je dynamicky vykreslována pomocí SVG a má několik vrstev s různými časováními a animacemi, což vytváří realistický efekt pohybu vody. Vlny jsou dostupné v několika variantách (smooth, choppy, cascade) pro různé sekce webu.

### Hackerský matrix efekt

V pozadí webu běží subtilní "matrix déšť" vykreslovaný pomocí Canvas API, který přidává dynamický pocit hackerského prostředí. Tento efekt je jemný, aby nerušil obsah stránky, ale zároveň posiluje unikátní vizuální identitu.

### Vodní kapičky

Po celé stránce se objevují animované vodní kapičky, které se pohybují a pulzují, což přidává na dynamice a udržuje tematickou konzistenci. Kapičky jsou generovány náhodně a mají různé velikosti a animace.

### Terminálový styl

Texty nadpisů a některé elementy používají styl připomínající příkazový řádek s blikajícím kurzorem, barevným zvýrazněním a monospacovým fontem, což podtrhuje technologickou identitu projektu.

## Sekce webu

1. **Hero** - Úvodní sekce s hlavním sdělením
2. **O nás** - Představení společnosti a jejích hodnot
3. **Služby** - Nabídka služeb s detaily
4. **Terminál** - Interaktivní terminálová sekce pro technologické demo
5. **Technologie** - Přehled používaných technologií
6. **Projekty** - Ukázky realizovaných projektů
7. **Workflow** - Popis pracovního postupu
8. **Reference** - Zpětná vazba od klientů
9. **Ceník** - Cenové balíčky a plány
10. **Blog** - Články a novinky
11. **FAQ** - Často kladené dotazy
12. **Kontakt** - Kontaktní formulář a údaje

## Použití a spuštění

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev

# Build pro produkci
npm run build

# Náhled produkčního buildu
npm run preview
```

## Responzivní design

Web je plně responzivní a optimalizovaný pro všechna zařízení od mobilních telefonů po širokoúhlé monitory. Používá přístup "mobile-first" a dynamicky se přizpůsobuje různým velikostem obrazovky.

## Další vývoj

- Implementace vícejazyčnosti (EN/DE)
- Přidání portfolia případových studií
- Rozšíření blogu o automatické načítání článků
- Integrace online objednávkového systému
- Rozšíření analytických nástrojů

## Autor

Vytvořeno s 💙 týmem Webseidon
