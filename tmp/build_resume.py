from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING, WD_TAB_ALIGNMENT
from docx.enum.section import WD_SECTION
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_BREAK
from pathlib import Path

ROOT = Path('/Users/yiqichen/MyWebsite')
OUT = ROOT / 'output'
OUT.mkdir(exist_ok=True)
DOCX_PATH = OUT / 'Yiqi_Chen_Resume_AI_UXR.docx'

INK = RGBColor(20, 27, 35)
ACCENT = RGBColor(30, 79, 116)
MUTED = RGBColor(76, 86, 96)

doc = Document()
sec = doc.sections[0]
sec.page_width = Inches(8.27)
sec.page_height = Inches(11.69)
sec.top_margin = Inches(0.42)
sec.bottom_margin = Inches(0.42)
sec.left_margin = Inches(0.58)
sec.right_margin = Inches(0.58)
sec.header_distance = Inches(0.2)
sec.footer_distance = Inches(0.2)
usable = sec.page_width - sec.left_margin - sec.right_margin


def set_font(run, size=9.8, bold=False, italic=False, color=INK, name='Arial'):
    run.font.name = name
    run._element.get_or_add_rPr().rFonts.set(qn('w:ascii'), name)
    run._element.get_or_add_rPr().rFonts.set(qn('w:hAnsi'), name)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color


styles = doc.styles
normal = styles['Normal']
normal.font.name = 'Arial'
normal._element.rPr.rFonts.set(qn('w:ascii'), 'Arial')
normal._element.rPr.rFonts.set(qn('w:hAnsi'), 'Arial')
normal.font.size = Pt(9.8)
normal.font.color.rgb = INK
normal.paragraph_format.space_before = Pt(0)
normal.paragraph_format.space_after = Pt(0)
normal.paragraph_format.line_spacing = 1.0

if 'Resume Bullet' not in styles:
    bullet_style = styles.add_style('Resume Bullet', WD_STYLE_TYPE.PARAGRAPH)
else:
    bullet_style = styles['Resume Bullet']
bullet_style.font.name = 'Arial'
bullet_style._element.rPr.rFonts.set(qn('w:ascii'), 'Arial')
bullet_style._element.rPr.rFonts.set(qn('w:hAnsi'), 'Arial')
bullet_style.font.size = Pt(9.75)
bullet_style.paragraph_format.left_indent = Inches(0.16)
bullet_style.paragraph_format.first_line_indent = Inches(-0.12)
bullet_style.paragraph_format.space_after = Pt(1.8)
bullet_style.paragraph_format.line_spacing = 1.0


def set_keep(p, keep_next=False, keep_lines=True):
    pPr = p._p.get_or_add_pPr()
    if keep_next:
        pPr.append(OxmlElement('w:keepNext'))
    if keep_lines:
        pPr.append(OxmlElement('w:keepLines'))


def add_bottom_border(p, color='9FB7C8', size='6', space='2'):
    pPr = p._p.get_or_add_pPr()
    pBdr = pPr.find(qn('w:pBdr'))
    if pBdr is None:
        pBdr = OxmlElement('w:pBdr')
        pPr.append(pBdr)
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), size)
    bottom.set(qn('w:space'), space)
    bottom.set(qn('w:color'), color)
    pBdr.append(bottom)


def section_heading(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(5.0)
    p.paragraph_format.space_after = Pt(2.5)
    set_keep(p, keep_next=True)
    r = p.add_run(text.upper())
    set_font(r, size=10.0, bold=True, color=ACCENT)
    r.font.all_caps = True
    add_bottom_border(p)
    return p


def entry_header(role, org, location, dates):
    p = doc.add_paragraph()
    p.paragraph_format.tab_stops.add_tab_stop(usable, WD_TAB_ALIGNMENT.RIGHT)
    p.paragraph_format.space_before = Pt(1.5)
    p.paragraph_format.space_after = Pt(0.5)
    set_keep(p, keep_next=True)
    r = p.add_run(role)
    set_font(r, size=9.95, bold=True)
    r = p.add_run(f' | {org}')
    set_font(r, size=9.75, color=MUTED)
    if location:
        r = p.add_run(f' | {location}')
        set_font(r, size=9.75, color=MUTED)
    r = p.add_run(f'\t{dates}')
    set_font(r, size=9.35, bold=True, color=MUTED)
    return p


def bullet(text):
    p = doc.add_paragraph(style='Resume Bullet')
    set_keep(p)
    r = p.add_run('• ')
    set_font(r, size=9.75, color=ACCENT)
    r = p.add_run(text)
    set_font(r, size=9.75)
    return p


def add_labeled_line(label, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(1.6)
    set_keep(p)
    r = p.add_run(label)
    set_font(r, size=9.65, bold=True)
    r = p.add_run(text)
    set_font(r, size=9.65)


# Header: a restrained resume-specific masthead preserving the source style.
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(1)
r = p.add_run('YIQI CHEN')
set_font(r, size=18.5, bold=True, color=INK)
r.font.all_caps = True

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(2.5)
r = p.add_run('AI Product Research  |  UX Research  |  Product Design & Development')
set_font(r, size=9.8, bold=True, color=ACCENT)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(2.5)
r = p.add_run('yc3263@cornell.edu  |  +1 917-601-1562  |  Mandarin (Native), English (GRE 330)')
set_font(r, size=9.35, color=MUTED)

section_heading('Education')
entry_header('Cornell University', 'M.P.S. in Information Science (Incoming)', 'Ithaca, NY', 'Fall 2026')
entry_header('New York University, Tisch School of the Arts', 'BFA, Interactive Media Arts', 'New York, NY', 'Aug 2023 - Dec 2025')
bullet('GPA: 3.952/4.0; Summa Cum Laude; Tisch Dean\'s List, 2023-2025.')

section_heading('Research & Product Experience')
entry_header('Research Intern', 'Tsinghua Future Lab', 'Beijing, China', 'Jun 2026 - Present')
bullet('Develop research protocols for VR-based, AI-agent-mediated interviews, translating research questions into usability tests and semi-structured interview plans.')
bullet('Conduct literature reviews on sleep-intervention research and process assigned multimodal datasets with project-provided scripts to identify evidence-based design opportunities.')

entry_header('Design & Development Intern', 'Dunes Institute', 'Hybrid', 'Jul-Sep 2025; May-Jun 2026')
bullet('Designed and shipped an end-to-end interdisciplinary dictionary platform, owning research, information architecture, wireframes, responsive UI, implementation, and deployment.')
bullet('Built HTML/CSS/JavaScript interfaces plus backend and admin workflows for content management, user-activity tracking, uploads, and live system updates.')

entry_header('UX Design Intern', 'Cyber Partner AI', 'Shanghai, China', 'May-Jun 2025')
bullet('Designed B2B website wireframes and prototypes for LLM products; partnered with developers to refine usability and support launch.')
bullet('Researched LLM commercialization and embodied-robotics use cases, and authored clearer, task-oriented robotics operation documentation.')

section_heading('Selected Research & Design Projects')
entry_header('UnderCurrent', 'UX Research & Product Design', '', '2025')
bullet('Analyzed 1,000+ community posts and conducted 11 in-depth interviews to identify emotional behavior patterns in online fan communities; translated findings into a four-stage interaction framework.')

entry_header('Chirp', 'System Design & Hardware Interaction', '', '2025')
bullet('Designed and prototyped a LoRa-based multi-device health-signal system connecting wearables, community dashboards, and operational interfaces for older adults living alone.')

entry_header('Legends at NYU', 'Service Design & Gamified Systems', '', '2024-2025')
bullet('Designed a collaborative tabletop experience to reduce participation anxiety among international students; iterated mechanics through multiple playtests.')

section_heading('Skills')
add_labeled_line('Research: ', 'Semi-structured interviews, usability testing, literature review, qualitative synthesis, concept/prototype evaluation, market scanning')
add_labeled_line('Design & Development: ', 'Figma, Adobe Suite, HTML, CSS, JavaScript, Python, R, Java, Unity, Fusion 360, Arduino')
add_labeled_line('AI Tools: ', 'ChatGPT, Claude, Claude Code, Codex, Cursor, Gemini, Runway, Midjourney, Suno')

# Remove any accidental blank trailing paragraphs and set metadata.
doc.core_properties.title = 'Yiqi Chen Resume - AI Product and UX Research'
doc.core_properties.subject = 'AI product research, UX research, and product design resume'
doc.core_properties.author = 'Yiqi Chen'

doc.save(DOCX_PATH)
print(DOCX_PATH)
