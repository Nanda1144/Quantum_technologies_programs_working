import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from hashlib import sha256
import json
import time
from typing import List, Dict, Tuple

# ================== PART 1: QML FOR CROP PREDICTION ==================
class QuantumCropPredictor:
    def __init__(self):
        self.scaler = MinMaxScaler()
        self.quantum_params = None
        
    def _quantum_feature_map(self, X: np.ndarray) -> np.ndarray:
        """Simulate quantum feature encoding using classical approximation"""
        return np.sin(X * np.pi) + np.cos(X * np.pi/2)
    
    def _variational_circuit(self, features: np.ndarray, params: np.ndarray) -> np.ndarray:
        """Simulate quantum variational circuit"""
        # Ensure params has correct length
        n_features = features.shape[1]
        weights = params[:n_features]
        bias = params[n_features] if len(params) > n_features else 0
        return np.tanh(features @ weights + bias)
    
    def train(self, X: np.ndarray, y: np.ndarray):
        """Train simulated QML model"""
        X_scaled = self.scaler.fit_transform(X)
        X_quantum = self._quantum_feature_map(X_scaled)
        
        # Initialize parameters (weights + bias)
        n_features = X_quantum.shape[1]
        self.quantum_params = np.random.rand(n_features + 1)
        
        # Simulate quantum training with gradient descent
        lr = 0.01
        for _ in range(100):
            predictions = self._variational_circuit(X_quantum, self.quantum_params)
            error = predictions - y
            
            # Compute gradients
            grad_weights = X_quantum.T @ error / len(y)
            grad_bias = np.mean(error)
            
            # Combine gradients
            grad = np.zeros(n_features + 1)
            grad[:n_features] = grad_weights
            grad[-1] = grad_bias
            
            # Update parameters
            self.quantum_params -= lr * grad
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Predict crop yield using simulated QML model"""
        X_scaled = self.scaler.transform(X)
        X_quantum = self._quantum_feature_map(X_scaled)
        return self._variational_circuit(X_quantum, self.quantum_params)

# ================== PART 2: QUANTUM OPTIMIZATION ==================
class QuantumResourceOptimizer:
    def __init__(self):
        self.cost_matrix = None
        
    def _quantum_annealing_simulation(self, cost_matrix: np.ndarray) -> np.ndarray:
        """Simulate quantum annealing solution"""
        n = cost_matrix.shape[0]
        current_solution = np.random.randint(0, 2, n)
        current_cost = current_solution @ cost_matrix @ current_solution
        
        T = 1.0
        for _ in range(1000):
            new_solution = current_solution.copy()
            idx = np.random.randint(0, n)
            new_solution[idx] = 1 - new_solution[idx]
            new_cost = new_solution @ cost_matrix @ new_solution
            
            if new_cost < current_cost or np.random.rand() < np.exp(-(new_cost - current_cost)/T):
                current_solution = new_solution
                current_cost = new_cost
            T *= 0.99
        
        return current_solution
    
    def optimize_schedule(self, crop_data: Dict) -> Dict:
        """Optimize fertilizer/water schedule"""
        n_resources = 10
        self.cost_matrix = np.random.rand(n_resources, n_resources)
        self.cost_matrix = (self.cost_matrix + self.cost_matrix.T) / 2
        
        solution = self._quantum_annealing_simulation(self.cost_matrix)
        
        schedule = {
            'fertilizer': np.sum(solution[:5]),
            'water': np.sum(solution[5:]),
            'efficiency': np.mean(solution)
        }
        return schedule

# ================== PART 3: BLOCKCHAIN + QKD MARKETPLACE ==================
class QuantumBlockchain:
    def __init__(self):
        self.chain = []
        self.pending_transactions = []
        self.create_genesis_block()
        
    def create_genesis_block(self):
        """Create the first block in the chain"""
        genesis_block = {
            'index': 0,
            'timestamp': time.time(),
            'transactions': [],
            'previous_hash': '0',
            'nonce': 0
        }
        genesis_block['hash'] = self._hash_block(genesis_block)
        self.chain.append(genesis_block)
    
    def _hash_block(self, block: Dict) -> str:
        """Create SHA-256 hash of a block"""
        block_string = json.dumps(block, sort_keys=True).encode()
        return sha256(block_string).hexdigest()
    
    def _proof_of_work(self, block: Dict) -> str:
        """Simulate quantum-resistant proof of work"""
        block['nonce'] = 0
        while not self._hash_block(block).startswith('0000'):
            block['nonce'] += 1
        return self._hash_block(block)
    
    def add_transaction(self, transaction: Dict):
        """Add new transaction to pending list"""
        self.pending_transactions.append(transaction)
    
    def mine_block(self) -> Dict:
        """Mine a new block with pending transactions"""
        last_block = self.chain[-1]
        new_block = {
            'index': len(self.chain),
            'timestamp': time.time(),
            'transactions': self.pending_transactions,
            'previous_hash': last_block['hash'],
            'nonce': 0
        }
        
        new_block['hash'] = self._proof_of_work(new_block)
        self.chain.append(new_block)
        self.pending_transactions = []
        return new_block
    
    def validate_chain(self) -> bool:
        """Validate blockchain integrity"""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            
            if current['hash'] != self._hash_block(current):
                return False
            if current['previous_hash'] != previous['hash']:
                return False
        return True

class QKDSimulator:
    @staticmethod
    def generate_quantum_key(length: int = 256) -> str:
        """Simulate QKD key generation"""
        quantum_bits = np.random.randint(0, 2, size=length)
        return ''.join(map(str, quantum_bits))
    
    @staticmethod
    def encrypt_transaction(transaction: Dict, key: str) -> Dict:
        """Simulate quantum-secure encryption"""
        encrypted = {}
        for k, v in transaction.items():
            if isinstance(v, str):
                encrypted[k] = ''.join(chr(ord(c) ^ int(key[i % len(key)])) 
                                     for i, c in enumerate(v))
            else:
                encrypted[k] = v
        return encrypted

# ================== MAIN INTEGRATION ==================
class QuantumAgricultureSystem:
    def __init__(self):
        self.crop_predictor = QuantumCropPredictor()
        self.resource_optimizer = QuantumResourceOptimizer()
        self.blockchain = QuantumBlockchain()
        self.qkd = QKDSimulator()
        
    def run_system(self):
        """Execute the complete quantum agriculture system"""
        print("=== Quantum Agriculture System ===")
        
        # 1. Generate sample data
        print("\n1. Generating sample agriculture data...")
        data = self._generate_sample_data()
        X, y = data.drop('yield', axis=1).values, data['yield'].values
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        
        # 2. Train QML model
        print("\n2. Training Quantum Machine Learning model...")
        self.crop_predictor.train(X_train, y_train)
        predictions = self.crop_predictor.predict(X_test)
        rmse = np.sqrt(mean_squared_error(y_test, predictions))
        print(f"Crop prediction RMSE: {rmse:.4f}")
        
        # 3. Optimize resources
        print("\n3. Optimizing resource allocation...")
        crop_sample = {'soil_ph': 6.5, 'nitrogen': 0.8, 'temperature': 25}
        schedule = self.resource_optimizer.optimize_schedule(crop_sample)
        print(f"Optimized schedule: {schedule}")
        
        # 4. Blockchain transaction
        print("\n4. Processing marketplace transaction...")
        transaction = {
            'farmer_id': 'FARM001',
            'crop': 'wheat',
            'quantity': 100,
            'price': 3.5,
            'timestamp': time.time()
        }
        
        q_key = self.qkd.generate_quantum_key()
        encrypted_tx = self.qkd.encrypt_transaction(transaction, q_key)
        
        self.blockchain.add_transaction(encrypted_tx)
        new_block = self.blockchain.mine_block()
        print(f"New block mined: #{new_block['index']}")
        
        # 5. Validate blockchain
        print("\n5. Validating blockchain integrity...")
        is_valid = self.blockchain.validate_chain()
        print(f"Blockchain valid: {is_valid}")
        
        print("\n=== System Execution Complete ===")
    
    def _generate_sample_data(self) -> pd.DataFrame:
        """Generate sample agriculture data"""
        np.random.seed(42)
        n_samples = 500
        data = {
            'soil_ph': np.random.uniform(5.0, 8.0, n_samples),
            'nitrogen': np.random.uniform(0.1, 1.0, n_samples),
            'phosphorus': np.random.uniform(0.1, 1.0, n_samples),
            'temperature': np.random.uniform(15, 35, n_samples),
            'rainfall': np.random.uniform(50, 200, n_samples),
            'yield': np.random.uniform(1.0, 5.0, n_samples)
        }
        return pd.DataFrame(data)

# ================== EXECUTION ==================
if __name__ == "__main__":
    system = QuantumAgricultureSystem()
    system.run_system()
