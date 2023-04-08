import { body } from './modal.js';
import { pristine, hashtagInput, descriptionInput } from './validation.js';
import { setScale } from './scale.js';
import { resetEffects } from './effects.js';
import { showSendingSuccessMessage } from './alert-messages.js';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
export const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditing = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('#upload-cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const preview = imgUploadForm.querySelector('.img-upload__preview img');

const isTextInputActive = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === descriptionInput;

const setImgPreview = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));
  if(matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export const onImgEditingEscKeydown = (evt) => {
  if(evt.key === 'Escape' && !isTextInputActive()) {
    evt.preventDefault();
    imgEditing.classList.add('hidden');
    body.classList.remove('modal-open');
    imgUploadInput.value = '';
  }
};

export const closeImgEditing = () => {
  imgEditing.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();
  pristine.reset();
  resetEffects();
  showSendingSuccessMessage();
  document.removeEventListener('keydown', onImgEditingEscKeydown);
};

export const openImgEditing = () => {
  imgEditing.classList.remove('hidden');
  body.classList.add('modal-open');
  setScale();
  imgUploadForm.querySelector('.img-upload__effect-level').classList.add('visually-hidden');
  document.addEventListener('keydown', onImgEditingEscKeydown);
  setImgPreview();
};

export const blockSubmitButton = () => {
  submitButton.disabled = true;
};

export const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

// export const submitForm = (cb) => {
//   imgUploadForm.addEventListener('submit', async (evt) => {
//     evt.preventDefault();
//     if (pristine.validate()) {
//       blockSubmitButton();
//       const formData = new FormData(evt.target);
//       await cb(formData);
//       unblockSubmitButton();
//     }
//   });
// };

imgUploadCancel.addEventListener('click', closeImgEditing);
imgUploadInput.addEventListener('change', openImgEditing);
