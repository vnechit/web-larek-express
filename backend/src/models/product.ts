import mongoose, { Schema } from 'mongoose';

interface IFile {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  price: number | null;
  description: string;
  category: string;
  image: IFile;
}

const imageSchema = new Schema<IFile>({
  fileName: {
    type: String,
    requied: [true, 'Поле "fileName" должно быть заполнено'],
  },
  originalName: {
    type: String,
    required: [true, 'Поле "originalName" должно быть заполнено'],
  },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
  description: {
    required: false,
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  image: imageSchema,
});

export default mongoose.model<IProduct>('product', productSchema);
