// LocalStorage interfeysi
interface LocalStorage {
  setItem: (key: string, data: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}


export const setItem: LocalStorage["setItem"] = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.log(`ma'lumotni saqlashda xato yuz berdi`);
  }
};


export const getItem: LocalStorage["getItem"] = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(`ma'lumotni olishda xato yuz berdi`);
    return null;
  }
};


export const removeItem: LocalStorage["removeItem"] = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(`ma'lumotni o'chirishda xato yuz berdi`);
  }
};
