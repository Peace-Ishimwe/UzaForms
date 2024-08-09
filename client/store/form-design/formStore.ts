import { SectionTypes, QuestionTypes } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FormState {
  sections: SectionTypes[];
  setSections: (sections: SectionTypes[]) => void;
  initializeForm: (initialData?: FormState) => void;
  addSection: (section: SectionTypes, position?: number) => void;
  updateSection: (index: number, section: SectionTypes) => void;
  addQuestionToSection: (sectionIndex: number, question: QuestionTypes) => void;
  removeSection: (index: number) => void;
  removeQuestionFromSection: (sectionIndex: number, questionIndex: number) => void;
  splitSection: (sectionIndex: number, questionIndex: number, newSection: SectionTypes) => void;
}

export const createFormStore = (formId: string) => 
  create(
    persist<FormState>(
      (set) => ({
        sections: [],
        setSections: (sections) => set((state) => ({ ...state, sections })),
        initializeForm: (initialData) =>
          set((state) => ({
            ...state,
            sections: initialData
              ? initialData.sections
              : [{ id: `section-${Date.now()}`, name: '', questions: [], nextSectionId: '' }],
          })),
        addSection: (section, position) =>
          set((state) => {
            const sections = [...state.sections];
            if (position !== undefined) {
              sections.splice(position, 0, section);
            } else {
              sections.push(section);
            }
            return { ...state, sections };
          }),
        updateSection: (index, section) =>
          set((state) => {
            const sections = [...state.sections];
            sections[index] = section;
            return { ...state, sections };
          }),
        addQuestionToSection: (sectionIndex, question) =>
          set((state) => {
            const sections = [...state.sections];
            sections[sectionIndex].questions.push(question);
            return { ...state, sections };
          }),
        removeSection: (index) =>
          set((state) => {
            const sections = state.sections.filter((_, i) => i !== index);
            return { ...state, sections };
          }),
        removeQuestionFromSection: (sectionIndex, questionIndex) =>
          set((state) => {
            const sections = [...state.sections];
            sections[sectionIndex].questions = sections[sectionIndex].questions.filter((_, i) => i !== questionIndex);
            return { ...state, sections };
          }),
        splitSection: (sectionIndex, questionIndex, newSection) =>
          set((state) => {
            const sections = [...state.sections];
            const currentSection = { ...sections[sectionIndex] };
            newSection.questions = currentSection.questions.splice(questionIndex);
            sections.splice(sectionIndex + 1, 0, newSection);
            return { ...state, sections };
          }),
      }),
      {
        name: (formId ? `form-design-storage-${formId}` : 'form-design-storage'),
      },
    ),
  );