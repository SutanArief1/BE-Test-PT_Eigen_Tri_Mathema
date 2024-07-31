export class CreateBorrowDto {
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
  memberId: number;
  bookId: number;
}
