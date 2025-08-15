
# Intermediate Quantum Computing Example: Quantum Teleportation
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram

# 3 qubits: |q0>: state to teleport, |q1>: entanglement, |q2>: receiver
qc = QuantumCircuit(3, 3)

# Step 1: Prepare the state to be teleported (e.g., |+> state)
qc.h(0)  # Put q0 in superposition

# Step 2: Create Bell pair between q1 and q2
qc.h(1)
qc.cx(1,2)

# Step 3: Bell measurement on q0 and q1
qc.cx(0,1)
qc.h(0)

qc.barrier()

# Step 4: Measure q0 and q1
qc.measure([0,1], [0,1])

# Step 5: Conditional corrections on q2
qc.x(2).c_if( qc.cregs[0], 1)
qc.z(2).c_if( qc.cregs, 2)
# Depending on framework version, you may need:
# qc.x(2).c_if(qc.clbits, 1)
# qc.z(2).c_if(qc.clbits, 1)

# Step 6: Measure q2 (the teleported state)
qc.measure(2,2)

# Execute
simulator = Aer.get_backend('qasm_simulator')
job = execute(qc, simulator, shots=1024)
result = job.result()
counts = result.get_counts(qc)
print(counts)
# To visualize: plot_histogram(counts).show()
