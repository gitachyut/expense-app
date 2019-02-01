export class Expense {
    private _title: string;
    private _subject: string;
    private _spendDate: Date;
    private _cost: number;
    private _note: string;

    constructor(
        _title: string,
        _subject: string, 
        _spendDate: Date, 
        _cost: number,
        _note: string) {
        this._title = _title;
        this._subject = _subject;
        this._spendDate = _spendDate;
        this._cost = _cost;
        this._note = _note;
    }

    get title(): string {
        return this._title;
    }
    set title(newTitle: string) {
        this._title = newTitle;
    }
    get subject(): string {
        return this._subject;
    }
    set subject(newSubject: string) {
        this._subject = newSubject;
    }

    get cost(): number {
        return this._cost;
    }
    set cost(newCost: number) {
        this._cost = newCost;
    }
    get spendDate(): Date {
        return this._spendDate;
    }
    set spendDate(newspendDate: Date) {
        this._spendDate = newspendDate;
    }

    get note(): string {
        return this._note;
    }
    set note(newNote: string) {
        this._note = newNote;
    }
    
}
