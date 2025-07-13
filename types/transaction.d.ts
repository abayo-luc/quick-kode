interface ITransaction {
  balance?: string | null;
  name?: string;
  amount?: string;
  fees?: string | null;
  phoneNumber?: string;
  provider: 'MTN' | 'Airtel' | 'Unknown';
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}
