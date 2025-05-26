interface ITransaction {
  id: string;
  type: 'send' | 'receive' | 'buy-airtime';
  amount: number;
  recipientName?: string;
  recipientNumber?: string;
  senderName?: string;
  senderNumber?: string;
  provider?: string;
  date?: string; // Optional date field for transaction date
  description?: string; // Optional description field for additional details
  status?: 'pending' | 'completed' | 'failed'; // Optional status field for transaction status
}
