class ConditionCheckerApp {
    constructor() {
        this.selectedWells = [];
        this.currentScreen = 'index';
        this.screens = this.initializeScreens();
        this.init();
    }

    init() {
        this.createPlateGrid();
        this.setupEventListeners();
        this.updateDisplay();
    }

    initializeScreens() {
        return {
            index: {
                name: 'INDEX (HR2-144)',
                description: 'Hampton Research Index Screen',
                conditions: this.getIndexConditions()
            },
            jcsg: {
                name: 'JCSG+ (HR2-145)',
                description: 'Joint Center for Structural Genomics Plus Screen',
                conditions: this.getJCSGConditions()
            }
            // Additional screens can be added here in the future
        };
    }

    getIndexConditions() {
        // HR2-144 Reagent Formulations - mapping tube numbers (1-96) to conditions
        return {
            1: { salt: "None", buffer: "0.1 M Citric acid pH 3.5", precipitant: "2.0 M Ammonium sulfate" },
            2: { salt: "None", buffer: "0.1 M Sodium acetate trihydrate pH 4.5", precipitant: "2.0 M Ammonium sulfate" },
            3: { salt: "None", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "2.0 M Ammonium sulfate" },
            4: { salt: "None", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "2.0 M Ammonium sulfate" },
            5: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "2.0 M Ammonium sulfate" },
            6: { salt: "None", buffer: "0.1 M Tris pH 8.5", precipitant: "2.0 M Ammonium sulfate" },
            7: { salt: "None", buffer: "0.1 M Citric acid pH 3.5", precipitant: "3.0 M Sodium chloride" },
            8: { salt: "None", buffer: "0.1 M Sodium acetate trihydrate pH 4.5", precipitant: "3.0 M Sodium chloride" },
            9: { salt: "None", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "3.0 M Sodium chloride" },
            10: { salt: "None", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "3.0 M Sodium chloride" },
            11: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "3.0 M Sodium chloride" },
            12: { salt: "None", buffer: "0.1 M Tris pH 8.5", precipitant: "3.0 M Sodium chloride" },
            13: { salt: "None", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "0.3 M Magnesium formate dihydrate" },
            14: { salt: "None", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "0.5 M Magnesium formate dihydrate" },
            15: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "0.5 M Magnesium formate dihydrate" },
            16: { salt: "None", buffer: "0.1 M Tris pH 8.5", precipitant: "0.3 M Magnesium formate dihydrate" },
            17: { salt: "None", buffer: "None - pH 5.6", precipitant: "1.26 M Sodium phosphate monobasic monohydrate" },
            18: { salt: "None", buffer: "None - pH 6.9", precipitant: "0.14 M Potassium phosphate dibasic" },
            19: { salt: "None", buffer: "None - pH 8.2", precipitant: "0.49 M Sodium phosphate monobasic monohydrate" },
            20: { salt: "None", buffer: "None", precipitant: "0.91 M Potassium phosphate dibasic" },
            21: { salt: "None", buffer: "None", precipitant: "0.056 M Sodium phosphate monobasic monohydrate" },
            22: { salt: "None", buffer: "None", precipitant: "1.344 M Potassium phosphate dibasic" },
            23: { salt: "None", buffer: "None", precipitant: "1.4 M Sodium citrate tribasic dihydrate" },
            24: { salt: "None", buffer: "None", precipitant: "1.8 M Ammonium citrate tribasic pH 7.0" },
            25: { salt: "None", buffer: "None", precipitant: "0.8 M Succinic acid pH 7.0" },
            26: { salt: "None", buffer: "None", precipitant: "2.1 M DL-Malic acid pH 7.0" },
            27: { salt: "None", buffer: "None", precipitant: "2.8 M Sodium acetate trihydrate pH 7.0" },
            28: { salt: "None", buffer: "None", precipitant: "3.5 M Sodium formate pH 7.0" },
            29: { salt: "None", buffer: "None", precipitant: "1.1 M Ammonium tartrate dibasic pH 7.0" },
            30: { salt: "0.1 M Sodium chloride", buffer: "None", precipitant: "2.4 M Sodium malonate pH 7.0" },
            31: { salt: "0.8 M Potassium sodium tartrate tetrahydrate", buffer: "None", precipitant: "35% v/v Tacsimate TM pH 7.0" },
            32: { salt: "1.0 M Ammonium sulfate", buffer: "None", precipitant: "60% v/v Tacsimate TM pH 7.0" },
            33: { salt: "1.1 M Sodium malonate pH 7.0", buffer: "None", precipitant: "1.5 M Ammonium sulfate" },
            34: { salt: "1.0 M Succinic acid pH 7.0", buffer: "None", precipitant: "0.5% w/v Polyethylene glycol monomethyl ether 5,000" },
            35: { salt: "1.0 M Ammonium sulfate", buffer: "None", precipitant: "1% w/v Polyethylene glycol 3,350" },
            36: { salt: "15% v/v Tacsimate TM pH 7.0", buffer: "None", precipitant: "0.5% v/v Jeffamine ® ED-2001 pH 7.0" },
            37: { salt: "None", buffer: "None", precipitant: "1% w/v Polyethylene glycol monomethyl ether 2,000" },
            38: { salt: "None", buffer: "None", precipitant: "0.5% w/v Polyethylene glycol 8,000" },
            39: { salt: "None", buffer: "None", precipitant: "2% w/v Polyethylene glycol 3,350" },
            40: { salt: "None", buffer: "0.2 M Calcium chloride dihydrate", precipitant: "25% w/v Polyethylene glycol 1,500" },
            41: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "30% v/v Jeffamine ® M-600 ® pH 7.0" },
            42: { salt: "None", buffer: "None", precipitant: "30% v/v Jeffamine ® ED-2001 pH 7.0" },
            43: { salt: "None", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            44: { salt: "None", buffer: "0.1 M Tris pH 8.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            45: { salt: "None", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            46: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "25% w/v Polyethylene glycol 3,350" },
            47: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "25% w/v Polyethylene glycol 3,350" },
            48: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "25% w/v Polyethylene glycol 3,350" },
            49: { salt: "0.2 M Calcium chloride dihydrate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            50: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            51: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            52: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M HEPES pH 7.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            53: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M Tris pH 8.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            54: { salt: "0.05 M Calcium chloride dihydrate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "30% v/v Polyethylene glycol monomethyl ether 550" },
            55: { salt: "0.05 M Magnesium chloride hexahydrate", buffer: "0.1 M HEPES pH 7.5", precipitant: "30% v/v Polyethylene glycol monomethyl ether 550" },
            56: { salt: "0.2 M Potassium chloride", buffer: "0.05 M HEPES pH 7.5", precipitant: "35% v/v Polyethylene glycol 400" },
            57: { salt: "0.05 M Ammonium sulfate", buffer: "0.05 M BIS-TRIS pH 6.5", precipitant: "30% w/v Polyethylene glycol 600" },
            58: { salt: "None", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "45% v/v Polypropylene glycol P 400" },
            59: { salt: "0.02 M Magnesium chloride hexahydrate", buffer: "0.1 M HEPES pH 7.5", precipitant: "22% w/v Poly(acrylic acid sodium salt) 5,100" },
            60: { salt: "0.01 M Cobalt(II) chloride hexahydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "20% w/v Polyvinylpyrrolidone K 15" },
            61: { salt: "0.2 M L-Proline", buffer: "0.1 M HEPES pH 7.5", precipitant: "10% w/v Polyethylene glycol 3,350" },
            62: { salt: "0.2 M Trimethylamine N-oxide dihydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "20% w/v Polyethylene glycol monomethyl ether 2,000" },
            63: { salt: "5% v/v Tacsimate TM pH 7.0", buffer: "0.1 M HEPES pH 7.0", precipitant: "10% w/v Polyethylene glycol monomethyl ether 5,000" },
            64: { salt: "0.005 M Cobalt(II) chloride hexahydrate", buffer: "0.1 M HEPES pH 7.5", precipitant: "12% w/v Polyethylene glycol 3,350" },
            65: { salt: "0.005 M Nickel(II) chloride hexahydrate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "17% w/v Polyethylene glycol 10,000" },
            66: { salt: "0.005 M Cadmium chloride hydrate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            67: { salt: "0.005 M Magnesium chloride hexahydrate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            68: { salt: "0.1 M Ammonium acetate", buffer: "0.1 M HEPES pH 7.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            69: { salt: "0.2 M Ammonium sulfate", buffer: "0.1 M Tris pH 8.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            70: { salt: "0.2 M Ammonium sulfate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            71: { salt: "0.2 M Ammonium sulfate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            72: { salt: "0.2 M Ammonium sulfate", buffer: "0.1 M HEPES pH 7.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            73: { salt: "0.2 M Sodium chloride", buffer: "0.1 M Tris pH 8.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            74: { salt: "0.2 M Sodium chloride", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            75: { salt: "0.2 M Sodium chloride", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            76: { salt: "0.2 M Sodium chloride", buffer: "0.1 M HEPES pH 7.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            77: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            78: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            79: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            80: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M HEPES pH 7.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            81: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M Tris pH 8.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            82: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            83: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 6.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            84: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M HEPES pH 7.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            85: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            86: { salt: "0.2 M Potassium sodium tartrate tetrahydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            87: { salt: "0.2 M Sodium malonate pH 7.0", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            88: { salt: "0.2 M Ammonium citrate tribasic pH 7.0", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            89: { salt: "0.1 M Succinic acid pH 7.0", buffer: "None", precipitant: "15% w/v Polyethylene glycol 3,350" },
            90: { salt: "0.2 M Sodium formate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            91: { salt: "0.15 M DL-Malic acid pH 7.0", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            92: { salt: "0.1 M Magnesium formate dihydrate", buffer: "None", precipitant: "15% w/v Polyethylene glycol 3,350" },
            93: { salt: "0.05 M Zinc acetate dihydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            94: { salt: "0.2 M Sodium citrate tribasic dihydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            95: { salt: "0.1 M Potassium thiocyanate", buffer: "None", precipitant: "30% w/v Polyethylene glycol monomethyl ether 2,000" },
            96: { salt: "0.15 M Potassium bromide", buffer: "None", precipitant: "30% w/v Polyethylene glycol monomethyl ether 2,000" }
        };
    }

    getJCSGConditions() {
        // HR2-145 JCSG+ Reagent Formulations - mapping tube numbers (1-96) to conditions
        return {
            1: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M Sodium acetate trihydrate pH 4.5", precipitant: "50% v/v Polyethylene glycol 400" },
            2: { salt: "None", buffer: "0.1 M Sodium citrate tribasic dihydrate pH 5.5", precipitant: "20% w/v Polyethylene glycol 3,000" },
            3: { salt: "0.2 M Ammonium citrate dibasic", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            4: { salt: "0.02 M Calcium chloride dihydrate", buffer: "0.1 M Sodium acetate trihydrate pH 4.6", precipitant: "30% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            5: { salt: "0.2 M Magnesium formate dihydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            6: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M Sodium citrate tribasic dihydrate pH 4.2", precipitant: "20% w/v Polyethylene glycol 1,000" },
            7: { salt: "None", buffer: "0.1 M CHES pH 9.5", precipitant: "20% w/v Polyethylene glycol 8,000" },
            8: { salt: "0.2 M Ammonium formate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            9: { salt: "0.2 M Ammonium chloride", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            10: { salt: "0.2 M Potassium formate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            11: { salt: "0.2 M Ammonium phosphate monobasic", buffer: "0.1 M Tris pH 8.5", precipitant: "50% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            12: { salt: "0.2 M Potassium nitrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            13: { salt: "None", buffer: "0.1 M Citric acid pH 4.0", precipitant: "0.8 M Ammonium sulfate" },
            14: { salt: "0.2 M Sodium thiocyanate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            15: { salt: "None", buffer: "0.1 M BICINE pH 9.0", precipitant: "20% w/v Polyethylene glycol 6,000" },
            16: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "10% w/v Polyethylene glycol 8,000, 8% v/v Ethylene glycol" },
            17: { salt: "None", buffer: "0.1 M Sodium cacodylate trihydrate pH 6.5", precipitant: "5% w/v Polyethylene glycol 8,000, 40% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            18: { salt: "None", buffer: "0.1 M Sodium citrate tribasic dihydrate pH 4.2", precipitant: "5% w/v Polyethylene glycol 1,000, 40% v/v Ethanol" },
            19: { salt: "None", buffer: "0.1 M Sodium acetate trihydrate pH 4.6", precipitant: "8% w/v Polyethylene glycol 4,000" },
            20: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M Tris pH 7.0", precipitant: "10% w/v Polyethylene glycol 8,000" },
            21: { salt: "None", buffer: "0.1 M Citric acid pH 5.0", precipitant: "20% w/v Polyethylene glycol 6,000" },
            22: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M Sodium cacodylate trihydrate pH 6.5", precipitant: "50% v/v Polyethylene glycol 200" },
            23: { salt: "None", buffer: "None", precipitant: "1.6 M Sodium citrate tribasic dihydrate pH 6.5" },
            24: { salt: "0.2 M Potassium citrate tribasic monohydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            25: { salt: "0.2 M Sodium chloride", buffer: "0.1 M Sodium citrate tribasic dihydrate pH 4.2", precipitant: "20% w/v Polyethylene glycol 8,000" },
            26: { salt: "1.0 M Lithium chloride", buffer: "0.1 M Citric acid pH 4.0", precipitant: "20% w/v Polyethylene glycol 6,000" },
            27: { salt: "0.2 M Ammonium nitrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            28: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "10% w/v Polyethylene glycol 6,000" },
            29: { salt: "None", buffer: "0.1 M HEPES sodium pH 7.5", precipitant: "0.8 M Sodium phosphate monobasic monohydrate, 0.8 M Potassium phosphate monobasic" },
            30: { salt: "None", buffer: "0.1 M Sodium citrate tribasic dihydrate pH 4.2", precipitant: "40% v/v Polyethylene glycol 300" },
            31: { salt: "0.2 M Zinc acetate dihydrate", buffer: "0.1 M Sodium acetate trihydrate pH 4.5", precipitant: "10% w/v Polyethylene glycol 3,000" },
            32: { salt: "None", buffer: "0.1 M Tris pH 8.5", precipitant: "20% v/v Ethanol" },
            33: { salt: "None", buffer: "0.068 M Sodium phosphate monobasic monohydrate, 0.032 M Potassium phosphate dibasic pH 6.2", precipitant: "10% v/v Glycerol, 25% v/v 1,2-Propanediol" },
            34: { salt: "None", buffer: "0.1 M BICINE pH 9.0", precipitant: "2% v/v 1,4-Dioxane, 10% w/v Polyethylene glycol 20,000" },
            35: { salt: "None", buffer: "0.1 M Sodium acetate trihydrate pH 4.6", precipitant: "2.0 M Ammonium sulfate" },
            36: { salt: "None", buffer: "None", precipitant: "10% w/v Polyethylene glycol 1,000, 10% w/v Polyethylene glycol 8,000" },
            37: { salt: "None", buffer: "None", precipitant: "24% w/v Polyethylene glycol 1,500, 20% v/v Glycerol" },
            38: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M HEPES sodium pH 7.5", precipitant: "30% v/v Polyethylene glycol 400" },
            39: { salt: "0.2 M Sodium chloride", buffer: "0.068 M Sodium phosphate monobasic monohydrate, 0.032 M Potassium phosphate dibasic pH 6.2", precipitant: "50% v/v Polyethylene glycol 200" },
            40: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M Sodium acetate trihydrate pH 4.5", precipitant: "30% w/v Polyethylene glycol 8,000" },
            41: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "70% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            42: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "20% w/v Polyethylene glycol 8,000" },
            43: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "40% v/v Polyethylene glycol 400" },
            44: { salt: "None", buffer: "0.1 M Tris pH 8.0", precipitant: "40% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            45: { salt: "0.17 M Ammonium sulfate", buffer: "None", precipitant: "25.5% w/v Polyethylene glycol 4,000, 15% v/v Glycerol" },
            46: { salt: "0.2 M Calcium acetate hydrate", buffer: "0.1 M Sodium cacodylate trihydrate pH 6.5", precipitant: "40% v/v Polyethylene glycol 300" },
            47: { salt: "0.14 M Calcium chloride dihydrate", buffer: "0.07 M Sodium acetate trihydrate pH 4.6", precipitant: "14% v/v 2-Propanol, 30% v/v Glycerol" },
            48: { salt: "0.04 M Potassium phosphate monobasic", buffer: "None", precipitant: "16% w/v Polyethylene glycol 8,000, 20% v/v Glycerol" },
            49: { salt: "None", buffer: "0.1 M Sodium cacodylate trihydrate pH 6.5", precipitant: "1.0 M Sodium citrate tribasic dihydrate" },
            50: { salt: "0.2 M Sodium chloride", buffer: "0.1 M Sodium cacodylate trihydrate pH 6.5", precipitant: "2.0 M Ammonium sulfate" },
            51: { salt: "0.2 M Sodium chloride", buffer: "0.1 M HEPES pH 7.5", precipitant: "10% v/v 2-Propanol" },
            52: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "1.26 M Ammonium sulfate" },
            53: { salt: "None", buffer: "0.1 M CAPS pH 10.5", precipitant: "40% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            54: { salt: "0.2 M Zinc acetate dihydrate", buffer: "0.1 M Imidazole pH 8.0", precipitant: "20% w/v Polyethylene glycol 3,000" },
            55: { salt: "0.2 M Zinc acetate dihydrate", buffer: "0.1 M Sodium cacodylate trihydrate pH 6.5", precipitant: "10% v/v 2-Propanol" },
            56: { salt: "None", buffer: "0.1 M Sodium acetate trihydrate pH 4.5", precipitant: "1.0 M Ammonium phosphate dibasic" },
            57: { salt: "None", buffer: "0.1 M MES monohydrate pH 6.5", precipitant: "1.6 M Magnesium sulfate heptahydrate" },
            58: { salt: "None", buffer: "0.1 M BICINE pH 9.0", precipitant: "10% w/v Polyethylene glycol 6,000" },
            59: { salt: "0.16 M Calcium acetate hydrate", buffer: "0.08 M Sodium cacodylate trihydrate pH 6.5", precipitant: "14.4% w/v Polyethylene glycol 8,000, 20% v/v Glycerol" },
            60: { salt: "None", buffer: "0.1 M Imidazole pH 8.0", precipitant: "10% w/v Polyethylene glycol 8,000" },
            61: { salt: "0.05 M Cesium chloride", buffer: "0.1 M MES monohydrate pH 6.5", precipitant: "30% v/v Jeffamine® M-600®" },
            62: { salt: "None", buffer: "0.1 M Citric acid pH 5.0", precipitant: "3.0 M Ammonium sulfate" },
            63: { salt: "None", buffer: "0.1 M Tris pH 8.0", precipitant: "20% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            64: { salt: "None", buffer: "0.1 M HEPES pH 7.5", precipitant: "20% v/v Jeffamine® M-600®" },
            65: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "50% v/v Ethylene glycol" },
            66: { salt: "None", buffer: "0.1 M BICINE pH 9.0", precipitant: "10% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            67: { salt: "None", buffer: "None", precipitant: "0.8 M Succinic acid pH 7.0" },
            68: { salt: "None", buffer: "None", precipitant: "2.1 M DL-Malic acid pH 7.0" },
            69: { salt: "None", buffer: "None", precipitant: "2.4 M Sodium malonate pH 7.0" },
            70: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "1.1 M Sodium malonate pH 7.0" },
            71: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "0.5% v/v Jeffamine® ED-2001 pH 7.0" },
            72: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "1.0 M Succinic acid pH 7.0" },
            73: { salt: "None", buffer: "0.1 M HEPES pH 7.0", precipitant: "1% w/v Polyethylene glycol monomethyl ether 2,000" },
            74: { salt: "0.02 M Magnesium chloride hexahydrate", buffer: "0.1 M HEPES pH 7.5", precipitant: "30% v/v Jeffamine® M-600® pH 7.0" },
            75: { salt: "0.01 M Cobalt(II) chloride hexahydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "30% v/v Jeffamine® ED-2001 pH 7.0" },
            76: { salt: "0.2 M Trimethylamine N-oxide dihydrate", buffer: "0.1 M Tris pH 8.5", precipitant: "22% w/v Poly(acrylic acid sodium salt) 5,100" },
            77: { salt: "0.005 M Cobalt(II) chloride hexahydrate", buffer: "0.1 M HEPES pH 7.5", precipitant: "20% w/v Polyvinylpyrrolidone K 15" },
            78: { salt: "0.005 M Nickel(II) chloride hexahydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol monomethyl ether 2,000" },
            79: { salt: "0.005 M Cadmium chloride hydrate", buffer: "None", precipitant: "12% w/v Polyethylene glycol 3,350" },
            80: { salt: "0.005 M Magnesium chloride hexahydrate", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            81: { salt: "0.2 M Sodium malonate pH 7.0", buffer: "None", precipitant: "15% w/v Polyethylene glycol 3,350" },
            82: { salt: "0.1 M Succinic acid pH 7.0", buffer: "None", precipitant: "20% w/v Polyethylene glycol 3,350" },
            83: { salt: "0.15 M DL-Malic acid pH 7.0", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "30% w/v Polyethylene glycol monomethyl ether 2,000" },
            84: { salt: "0.1 M Potassium thiocyanate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "30% w/v Polyethylene glycol monomethyl ether 2,000" },
            85: { salt: "0.15 M Potassium bromide", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "2.0 M Ammonium sulfate" },
            86: { salt: "None", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "3.0 M Sodium chloride" },
            87: { salt: "None", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "0.3 M Magnesium formate dihydrate" },
            88: { salt: "0.2 M Calcium chloride dihydrate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "1.0 M Ammonium sulfate" },
            89: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "1% w/v Polyethylene glycol 3,350" },
            90: { salt: "0.1 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            91: { salt: "0.2 M Ammonium sulfate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            92: { salt: "0.2 M Sodium chloride", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "45% v/v (+/-)-2-Methyl-2,4-pentanediol" },
            93: { salt: "0.2 M Lithium sulfate monohydrate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "17% w/v Polyethylene glycol 10,000" },
            94: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            95: { salt: "0.2 M Magnesium chloride hexahydrate", buffer: "0.1 M BIS-TRIS pH 5.5", precipitant: "25% w/v Polyethylene glycol 3,350" },
            96: { salt: "0.2 M Ammonium acetate", buffer: "0.1 M HEPES pH 7.5", precipitant: "25% w/v Polyethylene glycol 3,350" }
        };
    }

    createPlateGrid() {
        const plateGrid = document.getElementById('plateGrid');
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            
            // Create row header
            const rowHeader = document.createElement('div');
            rowHeader.className = 'row-header';
            rowHeader.textContent = row;
            plateGrid.appendChild(rowHeader);
            
            // Create wells for this row
            for (let col = 1; col <= 12; col++) {
                const wellId = `${row}${col}`;
                const tubeNumber = (rowIndex * 12) + col;
                const well = document.createElement('div');
                well.className = 'well';
                well.dataset.wellId = wellId;
                well.dataset.tubeNumber = tubeNumber;
                well.title = `Well ${wellId} (Tube ${tubeNumber})`;
                well.textContent = wellId;
                
                well.addEventListener('click', () => this.selectWell(wellId, tubeNumber));
                
                plateGrid.appendChild(well);
            }
        }
    }

    setupEventListeners() {
        // Screen selection dropdown
        document.getElementById('screenSelect').addEventListener('change', (e) => {
            this.changeScreen(e.target.value);
        });

        // Clear selection button
        document.getElementById('clearAll').addEventListener('click', () => {
            this.clearSelection();
        });
    }

    changeScreen(screenId) {
        this.currentScreen = screenId;
        this.clearSelection();
        this.updateScreenInfo();
    }

    updateScreenInfo() {
        const screenInfo = document.getElementById('screenInfo');
        const currentScreenData = this.screens[this.currentScreen];
        
        if (currentScreenData) {
            screenInfo.innerHTML = `
                <span class="current-screen">Current Screen: <strong>${currentScreenData.name}</strong></span>
            `;
        }
    }

    selectWell(wellId, tubeNumber) {
        const wellElement = document.querySelector(`[data-well-id="${wellId}"]`);
        if (!wellElement) return;
        
        // Check if well is already selected
        const existingIndex = this.selectedWells.findIndex(w => w.wellId === wellId);
        
        if (existingIndex >= 0) {
            // Deselect well
            this.selectedWells.splice(existingIndex, 1);
            wellElement.classList.remove('selected');
        } else {
            // Select well
            this.selectedWells.push({ wellId, tubeNumber });
            wellElement.classList.add('selected');
        }
        
        this.updateDisplay();
    }

    clearSelection() {
        document.querySelectorAll('.well.selected').forEach(well => {
            well.classList.remove('selected');
        });
        this.selectedWells = [];
        this.updateDisplay();
    }

    updateDisplay() {
        const conditionText = document.getElementById('conditionText');

        if (this.selectedWells.length === 0) {
            conditionText.innerHTML = 'Click on wells to see their crystallization conditions';
            return;
        }

        const currentScreenData = this.screens[this.currentScreen];
        let output = `<strong>${currentScreenData.name}</strong><br><br>`;
        
        this.selectedWells.forEach((well, index) => {
            const { wellId, tubeNumber } = well;
            const condition = currentScreenData.conditions[tubeNumber];
            
            if (condition) {
                output += `<strong>Well ${wellId} - Tube ${tubeNumber}</strong><br>`;
                output += `<strong>Salt:</strong> ${condition.salt}<br>`;
                output += `<strong>Buffer:</strong> ${condition.buffer}<br>`;
                output += `<strong>Precipitant:</strong> ${condition.precipitant}`;
            } else {
                output += `<strong>Well ${wellId} - Tube ${tubeNumber}</strong><br>`;
                output += `Condition data not found for this well in the selected screen.`;
            }
            
            // Add break line between wells (but not after the last one)
            if (index < this.selectedWells.length - 1) {
                output += '<br><br>';
            }
        });
        
        conditionText.innerHTML = output;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConditionCheckerApp();
});
