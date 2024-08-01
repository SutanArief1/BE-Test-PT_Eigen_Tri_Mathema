import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowsModule } from './borrows/borrows.module';
import { PenaltiesModule } from './penalties/penalties.module';

@Module({
  imports: [BooksModule, MembersModule, BorrowsModule, PenaltiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
