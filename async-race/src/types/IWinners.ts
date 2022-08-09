import IWinner from './IWinner';

interface IWinners {
  total: string;
  winners: Promise<IWinner[]>;
}

export default IWinners;
