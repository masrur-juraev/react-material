export const PROJECT_NAME = 'Cohere'
export const MODEL_TREE = 'Dashboard'
export const DIMENSIONS = 'Dimensions'
export const COOLING = 'Cooling'
export const LOSSES = 'Losses'
export const LPTN = 'LPTN'
export const FEA = 'FEA'
export const CFD = 'CFD'
export const RESULTS = 'Results'
export const BACKEND_URL =
  'http://ec2-54-228-143-226.eu-west-1.compute.amazonaws.com:8000'
export const FORM_DATA = {
  conductor: {
    CondType11: {
      Type: 'CondType11',
      Hwire: 0.0028,
      Nwppc_rad: 11,
      Nwppc_tan: 2,
      Wins_coil: null,
      Wins_wire: 0.0002,
      Wwire: 0.0070999999999999995,
      ConductorMaterial: 'Steel1',
      InsulationMaterial: 'Resin',
      "LossWindingCore": 1855.8,
      "LossWindingOverhang": 618.6
    },
    CondType12: {
      Type: 'CondType12',
      Nwppc: 24,
      Wins_cond: 0.1,
      Wins_wire: 4e-5,
      Wwire: 0.000723,
      ConductorMaterial: 'Copper1',
      InsulationMaterial: 'Resin',
      "LossWindingCore": 1855.8,
      "LossWindingOverhang": 618.6
    },
  },
  housing: {
    Frame: {
      Type: 'Frame',
      FrameLength: 0.302,
      ExternalRadius: 0.09,
      InternalRadius: 0.085,
      Material: 'Aluminium',
    },
    FrameBar: {
      Type: 'FrameBar',
      FrameLength: 1.796,
      ExternalRadius: 0.76,
      InternalRadius: 0.75,
      Barrelgap: 0,
      NBar: 12,
      WidthBar: 0.05,
      Material: 'Steel1',
    },
  },
  Cooling: {
    ThroughFlow: {
      DisplayName: 'Through Flow',
      Type:'ThroughFlow',
      InletAirTemperature: '',
      TotalFlowRate: '',
      Altitude: '',
      WaterJacket: {
        WithWaterJacket: '',
        WithoutWaterJacket: '',
      },
    },
    EnclosedWithFan: {
      DisplayName: 'Enclosed With Fan',
      Type:'EnclosedWithFan',
      InletAirTemperature: '',
      TotalFlowRate: '',
      Altitude:'',
      WaterJacket: {
        WithWaterJacket: '',
        WithoutWaterJacket: '',
      },
    },
    EnclosedWithoutFan: {
      DisplayName: 'Enclosed Without Fan',
      Type:'EnclosedWithoutFan',
      InletAirTemperature: '',
      TotalFlowRate: '',
      Altitude:'',
      WaterJacket: {
        WithWaterJacket: '',
        WithoutWaterJacket: '',
      },
    },
  },
  WaterJacket: {
    WithWaterJacket: {
      InletAirTemperature:'',
      Flowrate:'',
    },
    WithoutWaterJacket: '',
  },
  Frame_Hole:{
    Airgap:'',
  },
  Rotor_Lamhole:{
    Airgap:'',
  },
  FrameBar_Slot:{
    TopIp:'',
    BottomIP:'',
    Airgap:'',
    Barrelgap:'',
  },
  Frame_Slot:{
    BottomIP:'',
    Airgap:'',
    Barrelgap:'',
  },
  FrameBar_Hole:{
    Barrelgap:'',
    Airgap:''
  },
  CoolingSetp:{
    Value1:'',
    Value2:'',
    Value3:''
  },
  slot_stator: {
    SlotW21: {
      Type: 'SlotW21',
      H0: 0.002,
      H1: 0.00065,
      H2: 0.0234,
      W0: 0.003,
      W1: 0.005,
      W2: 0.005,
      Zs: 36,
    },
    SlotW10: {
      Type: 'SlotW10',
      H0: 0.0005,
      H1: 0.005,
      H1_is_rad: false,
      H2: 0.091,
      W0: 0.0206,
      W1: 0.025,
      W2: 0.0206,
      Zs: 72,
    },
    SlotW16: {
      Type: 'SlotW16',
      H0: 0.007,
      H2: 0.0216,
      R1: 1e-5,
      W0: 0.002,
      W3: 0.0035,
      Zs: 74,
    },
  },
  slot_rotor: {
    SlotW60: {
      Type: "SlotW60",
      H1: 0.01422,
      H2: 0.2225,
      H3: 0.0,
      H4: 0.0685,
      R1: 0.4515,
      W1: 0.47,
      W2: 0.27,
      W3: 0.03,
      Zs: 4
    },
  },
  hole: {
    HoleM52: {
      Type: 'HoleM52',
      H0: 0.001,
      H1: 0.005,
      H2: 0.0,
      W0: 0.027,
      W3: 0.001,
      Zh: 8,
      Material: 'Magnet1',
      "LossMagnet": 109.9
    },
    HoleM58: {
      Type: 'HoleM58',
      H0: 0.003,
      H1: 0.0,
      H2: 0.02,
      W0: 0.003,
      W1: 0.013,
      W2: 0.01,
      W3: 0.01,
      R0: 0.01,
      Zh: 6,
      Material: 'Magnet1',
      "LossMagnet": 109.9
    },
  },
  lamination_rotor: {
    LamSlot: {
      Type: 'LamSlot',
      Material: 'Steel1',
      CoreLength: 0.254,
      PackingFactor: 0.95,
      ExternalRadius: 0.085,
      InternalRadius: 0.05,
      "LossPoleShoeTip": 7237,
      "LossPoleShoeMid": 14303
    },
    LamHole: {
      Type: 'LamHole',
      Material: 'Steel1',
      CoreLength: 0.257,
      PackingFactor: 0.97,
      ExternalRadius: 0.0492,
      InternalRadius: 0.024,
      "LossLamInner": 2.1,
      "LossLamOuter": 83.9
    },
  },
  lamination_stator:{
    LamSlot: {
      Type: 'LamSlot',
      Material: 'Steel1',
      CoreLength: 0.254,
      PackingFactor: 0.95,
      ExternalRadius: 0.085,
      InternalRadius: 0.05,
      "LossBackIron": 255.1,
      "LossTooth": 887.4
    },
  },
  material: {
    Air: {
      Type: 'Air',
      HeatConductivity: 0.0257,
      Cp: 1007.0,
    },
    Steel1: {
      Type: 'Steel1',
      HeatConductivity: 43.0,
      Cp: 460.0,
    },
    Copper1: {
      Type: 'Copper1',
      HeatConductivity: 385.0,
      Cp: 381.0,
    },
    Resin: {
      Type: 'Resin',
      HeatConductivity: 0.3,
      Cp: 671.0,
    },
    Magnet1: {
      Type: 'Magnet1',
      HeatConductivity: 8.5,
      Cp: 450.0,
    },
    Aluminium: {
      Type: 'Aluminium',
      HeatConductivity: 200.0,
      Cp: 910.0,
    }
  },
}
export const Axial_Data= {
  axialType:{
    Airgap:{
      Type:'Airgap'
    },
    EWFluidRotor:{
      Type:'EWFluidRotor'
    },
    EWFluidStator:{
      Type:'EWFluidStator'
    },
    RotorLamInner:{
      Type:'RotorLamInner'
    },
    RotorLamOuter:{
      Type:'RotorLamOuter'
    },
    RotorMagnet:{
      Type:'RotorMagnet'
    },
    Shaft:{
      Type:'Shaft'
    },
    StatorBackIron:{
      Type:'StatorBackIron'
    },
    StatorTooth:{
      Type:'StatorTooth'
    },
    StatorWinding:{
      TypeNamePrefix:'StatorWinding'
    },
    WaterJacket:{
      Type:'WaterJacket'
    }
  }
}
export const flowRateData= {
  Types:{
    ThroughFlow:{
      Type:'ThroughFlow'

    },
    WithFan:{
      Type:'EnclosedWithFan'
    },
    WithoutFan:{
      Type:'EnclosedWithoutFan'
    },
  }
}

export const contour_data= {
  numbers:[
    {
      number:0
    },
    {
      number:1
    },
    {
      number:2
    },
    {
      number:3
    },
    {
      number: 4
    },
    {
      number: 5
    },
    {
      number: 6
    },
    {
      number: 7
    },
    {
      number: 8
    },
    {
      number: 9
    },
    {
      number: 10
    },
    {
      number: 11
    },
    {
      number: 12
    },
    {
      number: 13
    },
    {
      number: 14
    },
    {
      number: 15
    },
    {
      number: 16
    },
    {
      number: 17
    },
  ]
};
export const HtcData={
  Surface:{
    surfacename1:'',
    surfacename2:'',
    surfacename3:'',
  },
  HTCType:{
    ConstantValue:'120.5',
    Correlation:{
      option1:'',
      option2:''
    },
    variableValue:{

    }
  }
}

export const LOSS_DATA= {
  "WRSM": {
    "RotorPoleShoeTip": {
      "name": "Rotor Pole Shoe Tip",
      "region": "Core",
      "type": "Absolute",
      "loss": 7237
    },
    "RotorPoleShoeMid": {
      "name": "Rotor Pole Shoe Mid",
      "region": "Core",
      "type": "Absolute",
      "loss": 14303
    },
    "RotorWindingCore": {
      "name": "Rotor Winding Core",
      "region": "Core",
      "type": "Absolute",
      "loss": 14221
    },
    "RotorWindingEW-NDE": {
      "name": "Rotor Winding EW-NDE",
      "region": "EW-NDE-Rotor",
      "type": "Absolute",
      "loss": 5100
    },
    "RotorWindingEW-DE": {
      "name": "Rotor Winding EW-DE",
      "region": "EW-DE-Rotor",
      "type": "Absolute",
      "loss": 5100
    },
    "StatorWindingCore": {
      "name": "Stator Winding Core",
      "region": "Core",
      "type": "Absolute",
      "loss": 19460
    },
    "StatorWindingEW-NDE": {
      "name": "Stator Winding EW-NDE",
      "region": "EW-NDE-Stator",
      "type": "Absolute",
      "loss": 9360
    },
    "StatorWindingEW-DE": {
      "name": "Stator Winding EW-DE",
      "region": "EW-DE-Stator",
      "type": "Absolute",
      "loss": 9360
    },
    "StatorTooth": {
      "name": "Stator Tooth",
      "region": "Core",
      "type": "Absolute",
      "loss": 8170
    },
    "StatorBackIron": {
      "name": "Stator Back Iron",
      "region": "Core",
      "type": "Absolute",
      "loss": 26450
    }
  },
  "IPMSM": {
    "StatorWindingCore": {
      "name": "Stator Winding Core",
      "region": "Core",
      "type": "Absolute",
      "loss": 1855.8
    },
    "StatorWindingEW-NDE": {
      "name": "Stator Winding EW-NDE",
      "region": "EW-NDE-Stator",
      "type": "Absolute",
      "loss": 309.3
    },
    "StatorWindingEW-DE": {
      "name": "Stator Winding EW-DE",
      "region": "EW-DE-Stator",
      "type": "Absolute",
      "loss": 309.3
    },
    "StatorBackIron": {
      "name": "Stator Back Iron",
      "region": "Core",
      "type": "Absolute",
      "loss": 255.1
    },
    "StatorWindingTooth": {
      "name": "Stator Winding Tooth",
      "region": "Core",
      "type": "Absolute",
      "loss": 887.4
    },
    "RotorLamInner": {
      "name": "Rotor LamInner",
      "region": "Core",
      "type": "Absolute",
      "loss": 2.1
    },
    "RotorLamOuter": {
      "name": "Rotor LamOuter",
      "region": "Core",
      "type": "Absolute",
      "loss": 83.9
    },
    "RotorMagnet": {
      "name": "Rotor Magnet",
      "region": "Core",
      "type": "Absolute",
      "loss": 109.9
    }
  }
}