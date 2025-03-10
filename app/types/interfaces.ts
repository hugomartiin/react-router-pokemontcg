export interface Card {
    id: string;
    localId: string | number;
    name: string;
    image?: string;
    category: string;
    illustrator?: string;
    rarity?: string;
    variants: {
        normal: boolean;
        reverse: boolean;
        holo: boolean;
        firstEdition: boolean;
    };
    set: SetBrief;
    hp?: string;
    types?: string[];
    evolvesFrom?: string;
    abilities?: Ability[];
    attacks?: Attack[];
    weaknesses?: WeaknessResistance[];
    resistances?: WeaknessResistance[];
    retreatCost?: string[];
}

export interface Ability {
    name: string;
    text: string;
}

export interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

export interface WeaknessResistance {
    type: string;
    value: string;
}

export interface SetBrief {
    id: string;
    name: string;
    logo?: string;
    symbol?: string;
    cardCount: {
        total: number;
        official: number;
    };
}

export interface SerieBrief {
    id: string;
    name: string;
    logo?: string;
}
export interface ToastNotificationProps {
    isVisible: boolean;
    cardName: string;
    imageUrl: string;
}