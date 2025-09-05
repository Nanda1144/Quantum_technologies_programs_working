import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score
print("packages are installed for datasets analytsis, data visualization, data processing, market predictions\n")

#from qiskit import QuantumCircuit, Aer, transpile, assemble
from qiskit_aer import AerSimulator
from qiskit import QuantumCircuit, transpile
print("qiskit aer, quantum circuit packages are installed successfully\n")

from qiskit.circuit import ParameterVector
#from qiskit.algorithms import VQE, QAOA
#from qiskit.algorithms.optimizers import COBYLA, SPSA
from qiskit_algorithms import VQE, QAOA
from qiskit_algorithms.optimizers import COBYLA, SPSA
print("Quantum machine learning algorithms related package are installed successfully\n")

#from qiskit.opflow import PauliSumOp, I, X, Z, StateFn
from qiskit.quantum_info import SparsePauliOp, Pauli, Statevector

#from qiskit.utils import QuantumInstance
from qiskit.primitives import Sampler
from qiskit_aer import AerSimulator

sampler = Sampler()  # No backend here
backend = AerSimulator()

# Run circuit with backend specified in run()
#result = sampler.run(circuits, backend=backend).result()

from qiskit.primitives import Sampler


from qiskit.circuit.library import TwoLocal, ZZFeatureMap
from qiskit_machine_learning.algorithms import VQC, VQR
#from qiskit_machine_learning.neural_networks import CircuitQNN
from qiskit_machine_learning.circuit.library import QNNCircuit
from qiskit_machine_learning.neural_networks import EstimatorQNN, SamplerQNN
print("circuit related packages, neural network, quantum neural network, predictors are installed successfully\n")

#from qiskit_machine_learning.kernels import QuantumKernel
from qiskit_machine_learning.kernels import FidelityQuantumKernel
from qiskit.primitives import Sampler
from qiskit.circuit.library import ZZFeatureMap


from qiskit_optimization.applications import OptimizationApplication
from qiskit_optimization.converters import QuadraticProgramToQubo
from ipywidgets import interact, interactive, fixed, interact_manual
import ipywidgets as widgets
from IPython.display import display, clear_output
print("display the output related package like bargraph packages and libraries are installed successfully")

import os
import base64
print("market price duration time related package are installed successfully\n")

from io import BytesIO
import warnings
warnings.filterwarnings('ignore')
print("All package are imported into the program")

#https://chat.z.ai/s/ef27c239-3d82-4045-85ec-afa7611cf6fc



# IBM Quantum Setup
#from qiskit import IBMQ
# Replace with your IBM Quantum API key
#IBMQ.save_account('YOUR_IBM_QUANTUM_API_KEY', overwrite=True)
#provider = IBMQ.load_account()
#backend = provider.get_backend('ibmq_qasm_simulator')
